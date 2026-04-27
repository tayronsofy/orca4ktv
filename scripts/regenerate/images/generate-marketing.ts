// Generates the marketing / hero / regional / trial illustrations under public/images/.
// Each image has a hand-curated subject prompt; aspect ratio chosen per existing image's role.

import path from 'path';
import { generateImage } from '../lib/imagen.js';
import { generateImageOpenAI } from '../lib/openai-image.js';
import { buildImagePrompt } from '../lib/prompts.js';
import { backupFile } from '../lib/backup.js';
import { limit } from '../lib/concurrency.js';
import { isCompleted, markCompleted, markFailed, resetBucket, getStats } from '../lib/manifest.js';
import { PUBLIC_DIR } from '../lib/paths.js';
import type { CliFlags } from '../lib/cli.js';

const BUCKET = 'marketing-images';

interface ImageSpec {
  id: string;
  outputRel: string; // path relative to public/
  aspectRatio: '16:9' | '4:3' | '3:4' | '1:1';
  subject: string;
  provider?: 'imagen' | 'openai'; // default: imagen
}

const SPECS: ImageSpec[] = [
  // Hero / marketing — Features section trio: photojournalism style, real humans, TVs ON with live content
  {
    id: 'iptv-devices',
    outputRel: 'images/iptv-devices-scaled.png',
    aspectRatio: '16:9',
    subject:
      'Documentary photograph, real-life photo of an actual family of three — two parents in their 30s and one child around 10 years old — sitting on a deep navy sectional sofa in a modern living room, watching a large 4K TV mounted on the wall. The TV is turned ON and clearly displays a live football match in progress: green grass pitch, players in motion mid-action, blurred crowd in the background — a real broadcast scene, fully visible and in focus, occupying the TV screen. A tablet on the coffee table is also ON, showing a colorful streaming app with cover-art tiles. A smartphone on the armrest is ON, displaying a TV guide grid. Warm interior lighting from a lamp plus a subtle cyan bias-light glow (#00E5FF) behind the TV. Real human faces with natural skin texture, authentic expressions, candid moment. Shot on Sony A7R V, 35mm f/2.8, evening interior, photojournalism style, magazine editorial quality. NO illustration, NO cartoon, NO animation, NO digital art — this is a real photograph of real people.',
  },
  {
    id: 'iptv-quality',
    outputRel: 'images/iptv-quality-scaled.png',
    aspectRatio: '16:9',
    subject:
      'Documentary photograph, real-life photo of an actual adult (mid-30s, casually dressed) sitting on a deep navy sofa in a softly-lit modern living room, holding a TV remote, looking at a large wall-mounted 4K HDR TV. The TV is ON and clearly displays a vivid 4K nature documentary scene — for example a coral reef with bright fish, or a mountain landscape at sunset — fully visible and in sharp focus, demonstrating premium picture quality. Subtle cyan ambient bias-light (#00E5FF) glows behind the TV. Deep navy walls and furniture. Real human face, natural skin tones, candid relaxed posture. Shot on Canon R5, 50mm f/1.8, evening interior, photojournalism style. NO illustration, NO cartoon — this is a real photograph of a real person.',
  },
  {
    id: 'iptv-AI',
    outputRel: 'images/iptv-AI-scaled.png',
    aspectRatio: '16:9',
    subject:
      'Documentary photograph, real-life photo of an actual young adult (mid-20s, in a knit sweater) sitting on a deep navy sofa in a dimly-lit modern apartment, speaking aloud toward a large 4K TV across the room. The TV is ON and clearly displays a streaming app home screen — a grid of colorful movie and series cover-art tiles, fully visible and in focus. The person\'s mouth is mid-word, head tilted slightly, with a real conversational facial expression. Subtle cyan ambient bias-light (#00E5FF) glows behind the TV. Real human face, natural skin texture, authentic expression. Shot on Canon R5, 50mm f/1.4, evening interior, photojournalism style, magazine editorial quality. NO illustration, NO cartoon, NO animation — this is a real photograph of a real human being.',
  },
  {
    id: '4K-IPTV',
    outputRel: 'images/4K-IPTV-scaled.png',
    aspectRatio: '16:9',
    subject:
      'A casual stock photograph of two men in their 30s sitting on a dark blue couch in a stylish modern living room, watching a soccer game on a large flat-screen television. They are relaxed, both looking at the TV, one with a beverage in hand. The TV shows a soccer match: green grass field with players visible. Warm interior lighting with a subtle blue accent light behind the TV. Real people, candid moment, professional lifestyle photography, photo-realistic, like a Getty Images or Unsplash editorial photo of friends watching sports at home. Photographic, NOT an illustration.',
  },
  {
    id: 'resellers-hero',
    outputRel: 'images/resellers-hero.png',
    aspectRatio: '4:3',
    provider: 'openai',
    subject:
      'A real photograph of a professional IPTV reseller in their early 30s, focused, sitting at a sleek modern home-office desk. They are working on an open MacBook Pro laptop whose screen clearly displays a B2B dealer admin panel — a vertical sidebar of generic menu items on the left, a main dashboard area with three clean stat-tile widgets at the top showing subscriber-count metrics and a credit-balance widget, and below that a clean rectangular table-style list of customer rows with status pill badges (no specific brand names, no specific readable text — generic dashboard UI in the style of a modern SaaS admin panel). Beside the laptop on the desk: a smartphone propped up showing a colorful streaming-app channel grid (cover-art tiles), a leather notebook, a ceramic coffee mug, a single small succulent plant. A bias-light strip behind the desk casts a soft cyan ambient glow across the deep navy wall behind. Warm interior lamp light from a designer floor lamp on the side. Real human face with natural skin texture, candid focused expression. Magazine-quality lifestyle photography, shot on a Sony A7R V with a 50mm lens, evening interior, shallow depth of field. Photo-realistic, real photograph of a real person — NOT illustrated, NOT a cartoon, NOT digital art.',
  },
  {
    id: 'orca4ktv-not-harder',
    outputRel: 'images/orca4ktv-not-harder-scaled.png',
    aspectRatio: '16:9',
    subject:
      'Premium concept illustration of effortless smart streaming: a sofa silhouette with a remote raised, abstract cyan content waves flowing seamlessly toward a wide TV silhouette in the distance. Calm, sophisticated, no text.',
  },

  // USA — photo-realistic via OpenAI gpt-image-1 (Imagen 4 has illustration bias on USA themes)
  {
    id: 'usa-coverage',
    outputRel: 'images/usa-coverage.jpg',
    aspectRatio: '4:3',
    provider: 'openai',
    subject:
      'A real photograph of two American football fans, mid-30s, casual game-day clothing, sitting on a deep navy sectional sofa in a modern American living room. They are watching a live football match on a large 4K HDR TV mounted on the wall — the TV screen clearly shows a real football broadcast in progress with green grass field, players in motion, and a blurred crowd of fans in the stadium background. On the wall above the sofa, simple framed sports memorabilia (a generic leather football, a fabric pennant — no specific team names or logos). Soft cyan ambient bias-light glows from behind the TV. Deep navy walls and warm interior lamp lighting. Authentic candid expressions, magazine-quality lifestyle photography, shot on a Sony A1 with a 35mm lens, evening interior, shallow depth of field. Photo-realistic, real photograph of real people.',
  },
  {
    id: 'usa-epg',
    outputRel: 'images/usa-epg.jpg',
    aspectRatio: '4:3',
    provider: 'openai',
    subject:
      'A real photograph of an adult, mid-30s, sitting on a deep navy sofa in a softly-lit modern living room, holding a TV remote and looking at a large 4K Smart TV mounted on the wall. The TV screen displays a Smart TV channel guide interface — a vertical column of TV channel names on the left side, horizontal time slots across the top (showing times like 7:00 PM, 7:30 PM, 8:00 PM), and program titles arranged in colored rectangular grid cells. One cell near the middle of the grid is highlighted with a cyan background to indicate the currently airing show. The channel guide has a clean, professional Smart TV menu look. Soft cyan ambient bias-light glows behind the TV. Deep navy walls. Real human face with natural skin texture and candid expression. Magazine-quality lifestyle photography, shot on a Canon R5 with a 35mm lens, evening interior, shallow depth of field. Photo-realistic, real photograph of a real person watching a Smart TV.',
  },
  {
    id: 'usa-multi-device',
    outputRel: 'images/usa-multi-device.jpg',
    aspectRatio: '4:3',
    provider: 'openai',
    subject:
      'A close-up product-lifestyle photograph of a wooden coffee table in a modern American living room. Arranged on the table are multiple real streaming devices: an Amazon Firestick 4K Max remote, an Apple TV 4K box, a Roku Ultra streaming player, a smartphone with its screen on showing a colorful streaming app channel grid, and a tablet propped against a coffee mug showing a grid of movie poster thumbnails. Behind the table, slightly out of focus, a large 4K HDR Smart TV mounted on the wall is on, showing a live American football match (green grass field, players visible). Soft cyan ambient bias-light glows from behind the TV. Deep navy walls. Sharp focus on the foreground devices, shallow depth of field. Magazine-quality product-lifestyle photography, shot on a Sony A7R V with a 50mm lens, evening interior. Photo-realistic, real photograph of real streaming hardware in an actual American living room.',
  },

  // UK — photo-realistic via OpenAI gpt-image-1 (same approach as USA — Imagen 4 has illustration bias on regional themes)
  {
    id: 'uk-coverage',
    outputRel: 'images/uk-coverage.jpg',
    aspectRatio: '4:3',
    provider: 'openai',
    subject:
      'A real photograph of two British football fans, mid-30s, in casual home clothing (one in a plain navy team-colour jersey), sitting on a deep navy sectional sofa in a modern UK living room. They are watching a live Premier League football match on a large 4K HDR TV mounted on the wall — the TV screen clearly shows a real football broadcast with a green grass pitch, players in motion, and a blurred crowd of fans in the stadium background (no specific team kits or readable text). On the wall above the sofa, simple framed sports memorabilia (a generic football, a fabric pennant — no specific Premier League team identifiers, no readable text). Soft cyan ambient bias-light glows from behind the TV. Deep navy walls and warm interior lamp lighting. Authentic candid expressions, magazine-quality lifestyle photography, shot on a Sony A1 with a 35mm lens, evening interior, shallow depth of field. Photo-realistic, real photograph of real people.',
  },
  {
    id: 'uk-epg',
    outputRel: 'images/uk-epg.jpg',
    aspectRatio: '4:3',
    provider: 'openai',
    subject:
      'A real photograph of an adult, mid-30s, sitting on a deep navy sofa in a softly-lit modern UK living room, holding a TV remote and looking at a large 4K Smart TV mounted on the wall. The TV screen displays a Smart TV channel guide interface — a vertical column of TV channel names on the left side, horizontal time slots across the top (showing times like 7:00 PM, 7:30 PM, 8:00 PM), and program titles arranged in colored rectangular grid cells. One cell near the middle of the grid is highlighted with a cyan background to indicate the currently airing show. The channel guide has a clean, professional Smart TV menu look. Soft cyan ambient bias-light glows behind the TV. Deep navy walls. Real human face with natural skin texture and candid expression. Magazine-quality lifestyle photography, shot on a Canon R5 with a 35mm lens, evening interior, shallow depth of field. Photo-realistic, real photograph of a real person watching a Smart TV.',
  },
  {
    id: 'uk-multi-device',
    outputRel: 'images/uk-multi-device.jpg',
    aspectRatio: '4:3',
    provider: 'openai',
    subject:
      'A close-up product-lifestyle photograph of a wooden coffee table in a modern UK living room. Arranged on the table are multiple real streaming devices: an Amazon Firestick 4K Max remote, an Apple TV 4K box, a Roku Streaming Stick 4K player, a smartphone with its screen on showing a colorful streaming app channel grid, and a tablet propped against a coffee mug showing a grid of movie poster thumbnails. Behind the table, slightly out of focus, a large 4K HDR Smart TV mounted on the wall is on, showing a live football match (green grass field, players visible). Soft cyan ambient bias-light glows from behind the TV. Deep navy walls. Sharp focus on the foreground devices, shallow depth of field. Magazine-quality product-lifestyle photography, shot on a Sony A7R V with a 50mm lens, evening interior. Photo-realistic, real photograph of real streaming hardware in an actual UK living room.',
  },

  // Germany — photo-realistic via OpenAI gpt-image-1 with subtle German touches (football scarf, modern Berlin/Munich apartment, Frankfurt skyline)
  {
    id: 'germany-coverage',
    outputRel: 'images/germany-coverage.jpg',
    aspectRatio: '4:3',
    provider: 'openai',
    subject:
      'A real photograph of two German Bundesliga football fans, mid-30s, in casual home clothing (one wearing a plain navy-and-grey football scarf), sitting on a deep navy sectional sofa in a modern German urban apartment. They are watching a live Bundesliga football match on a large 4K HDR TV mounted on the wall — the TV screen clearly shows a real football broadcast with a green grass pitch, players in motion, and a blurred crowd of fans in the stadium background (no specific Bundesliga team logos or readable text). On the wall above the sofa, a generic vintage football photograph in a black frame and a small wooden shelf with a stein-style mug (no brewery branding). Through the window in the background: a softly-lit modern German cityscape at dusk with high-rises (suggesting Frankfurt or Berlin). Soft cyan ambient bias-light glows from behind the TV. Deep navy walls and warm interior lamp lighting. Authentic candid expressions, magazine-quality lifestyle photography, shot on a Sony A1 with a 35mm lens, evening interior, shallow depth of field. Photo-realistic, real photograph of real Bundesliga fans.',
  },
  {
    id: 'germany-epg',
    outputRel: 'images/germany-epg.jpg',
    aspectRatio: '4:3',
    provider: 'openai',
    subject:
      'A real photograph of an adult, mid-30s, sitting on a deep navy sofa in a softly-lit modern German living room, holding a TV remote and looking at a large 4K Smart TV mounted on the wall. The TV screen displays a Smart TV channel guide interface — a vertical column of TV channel names on the left side, horizontal time slots across the top (showing times like 19:00, 19:30, 20:00 in 24-hour format common in Germany), and program titles arranged in colored rectangular grid cells. One cell near the middle of the grid is highlighted with a cyan background to indicate the currently airing show. The channel guide has a clean, professional Smart TV menu look. A leather-bound German-language hardcover book on the side table, a minimalist designer floor lamp. Through the window in the background: dusk over a modern European cityscape. Soft cyan ambient bias-light glows behind the TV. Deep navy walls. Real human face with natural skin texture and candid expression. Magazine-quality lifestyle photography, shot on a Canon R5 with a 35mm lens, evening interior, shallow depth of field. Photo-realistic, real photograph of a real German person watching a Smart TV.',
  },
  {
    id: 'germany-multi-device',
    outputRel: 'images/germany-multi-device.jpg',
    aspectRatio: '4:3',
    provider: 'openai',
    subject:
      'A close-up product-lifestyle photograph of a wooden coffee table in a modern minimalist German apartment. Arranged on the table are multiple real streaming devices: an Amazon Firestick 4K Max remote, an Apple TV 4K box, a Roku Streaming Stick 4K player, a smartphone with its screen on showing a colorful streaming app channel grid, and a tablet propped against a coffee mug showing a grid of movie poster thumbnails. Beside them, a hardcover German-language book and a small designer notepad. Behind the table, slightly out of focus, a large 4K HDR Smart TV mounted on the wall is on, showing a live football match (green grass field, players visible). Through a window in the background: dusk over a modern German cityscape (suggesting a Berlin Mitte or Munich apartment). Soft cyan ambient bias-light glows from behind the TV. Deep navy walls, clean Scandinavian-meets-German design. Sharp focus on the foreground devices, shallow depth of field. Magazine-quality product-lifestyle photography, shot on a Sony A7R V with a 50mm lens, evening interior. Photo-realistic, real photograph of real streaming hardware in an actual German living room.',
  },

  // Canada — photo-realistic via OpenAI gpt-image-1 with subtle Canadian touches (hockey memorabilia, winter setting)
  {
    id: 'canada-coverage',
    outputRel: 'images/canada-coverage.jpg',
    aspectRatio: '4:3',
    provider: 'openai',
    subject:
      'A real photograph of two Canadian hockey fans, mid-30s, in casual home clothing (one wearing a plain red wool sweater), sitting on a deep navy sectional sofa in a modern Canadian living room. They are watching a live NHL Stanley Cup playoff hockey match on a large 4K HDR TV mounted on the wall — the TV screen clearly shows a real ice-hockey broadcast with skaters on a white ice rink, players in motion, and a blurred crowd of fans in the arena background (no specific NHL team logos or readable text). On the wall above the sofa, a generic black-and-white hockey jersey on display and a small framed photo of a snowy mountain landscape (no specific team identifiers). A wool blanket in burgundy/rust tone draped over the armrest. Through the window in the background: soft snow on rooftops at dusk. Soft cyan ambient bias-light glows from behind the TV. Deep navy walls and warm interior lamp lighting. Authentic candid expressions, magazine-quality lifestyle photography, shot on a Sony A1 with a 35mm lens, evening interior, shallow depth of field. Photo-realistic, real photograph of real Canadian hockey fans.',
  },
  {
    id: 'canada-epg',
    outputRel: 'images/canada-epg.jpg',
    aspectRatio: '4:3',
    provider: 'openai',
    subject:
      'A real photograph of an adult, mid-30s, sitting on a deep navy sofa in a softly-lit modern Canadian living room, holding a TV remote and looking at a large 4K Smart TV mounted on the wall. The TV screen displays a Smart TV channel guide interface — a vertical column of TV channel names on the left side, horizontal time slots across the top (showing times like 7:00 PM, 7:30 PM, 8:00 PM), and program titles arranged in colored rectangular grid cells. One cell near the middle of the grid is highlighted with a cyan background to indicate the currently airing show. The channel guide has a clean, professional Smart TV menu look. On the wall, a generic black hockey stick mounted decoratively (no team logos). A red wool throw blanket on the sofa armrest. Through the window in the background: snow-covered evergreen trees at dusk. Soft cyan ambient bias-light glows behind the TV. Deep navy walls. Real human face with natural skin texture and candid expression. Magazine-quality lifestyle photography, shot on a Canon R5 with a 35mm lens, evening interior, shallow depth of field. Photo-realistic, real photograph of a real Canadian person watching a Smart TV.',
  },
  {
    id: 'canada-multi-device',
    outputRel: 'images/canada-multi-device.jpg',
    aspectRatio: '4:3',
    provider: 'openai',
    subject:
      'A close-up product-lifestyle photograph of a wooden coffee table in a modern Canadian living room. Arranged on the table are multiple real streaming devices: an Amazon Firestick 4K Max remote, an Apple TV 4K box, a Roku Streaming Stick 4K player, a smartphone with its screen on showing a colorful streaming app channel grid, and a tablet propped against a coffee mug showing a grid of movie poster thumbnails. Beside them, a black hockey puck used as a paperweight (no team logos). Behind the table, slightly out of focus, a large 4K HDR Smart TV mounted on the wall is on, showing a live ice-hockey match (white ice rink, players visible). Through the window in the background: soft snow falling at dusk. Soft cyan ambient bias-light glows from behind the TV. Deep navy walls. Sharp focus on the foreground devices, shallow depth of field. Magazine-quality product-lifestyle photography, shot on a Sony A7R V with a 50mm lens, evening interior. Photo-realistic, real photograph of real streaming hardware in an actual Canadian living room.',
  },

  // Netherlands — photo-realistic via OpenAI gpt-image-1 with subtle Dutch touches (Oranje accents, Eredivisie scarf, Amsterdam canal apartment view)
  {
    id: 'netherlands-coverage',
    outputRel: 'images/netherlands-coverage.jpg',
    aspectRatio: '4:3',
    provider: 'openai',
    subject:
      'A real photograph of two Dutch Eredivisie football fans, mid-30s, in casual home clothing (one wearing a plain orange football scarf, a quiet nod to the Dutch national colour), sitting on a deep navy sectional sofa in a modern Amsterdam apartment. They are watching a live Eredivisie football match on a large 4K HDR TV mounted on the wall — the TV screen clearly shows a real football broadcast with a green grass pitch, players in motion, and a blurred crowd of fans in the stadium background (no specific Eredivisie team logos or readable text). On the wall above the sofa, a generic vintage football photograph in a black frame and a small wooden shelf with a simple ceramic mug. Through the tall window in the background: a softly-lit Amsterdam canal view at dusk with classic Dutch gabled rooftops and a few warm window lights reflecting in the water. Soft cyan ambient bias-light glows from behind the TV. Deep navy walls and warm interior lamp lighting. Authentic candid expressions, magazine-quality lifestyle photography, shot on a Sony A1 with a 35mm lens, evening interior, shallow depth of field. Photo-realistic, real photograph of real Dutch Eredivisie fans.',
  },
  {
    id: 'netherlands-epg',
    outputRel: 'images/netherlands-epg.jpg',
    aspectRatio: '4:3',
    provider: 'openai',
    subject:
      'A real photograph of an adult, mid-30s, sitting on a deep navy sofa in a softly-lit modern Dutch living room, holding a TV remote and looking at a large 4K Smart TV mounted on the wall. The TV screen displays a Smart TV channel guide interface — a vertical column of TV channel names on the left side, horizontal time slots across the top (showing times like 19:00, 19:30, 20:00 in 24-hour format common in the Netherlands), and program titles arranged in colored rectangular grid cells. One cell near the middle of the grid is highlighted with a cyan background to indicate the currently airing show. The channel guide has a clean, professional Smart TV menu look. A leather-bound Dutch-language hardcover book on the side table, a minimalist Scandinavian-style designer floor lamp, a small ceramic vase with a single tulip stem. Through the tall window in the background: dusk over an Amsterdam canal with classic Dutch gabled houses. Soft cyan ambient bias-light glows behind the TV. Deep navy walls. Real human face with natural skin texture and candid expression. Magazine-quality lifestyle photography, shot on a Canon R5 with a 35mm lens, evening interior, shallow depth of field. Photo-realistic, real photograph of a real Dutch person watching a Smart TV.',
  },
  {
    id: 'netherlands-multi-device',
    outputRel: 'images/netherlands-multi-device.jpg',
    aspectRatio: '4:3',
    provider: 'openai',
    subject:
      'A close-up product-lifestyle photograph of a wooden coffee table in a modern minimalist Amsterdam apartment. Arranged on the table are multiple real streaming devices: an Amazon Firestick 4K Max remote, an Apple TV 4K box, a Roku Streaming Stick 4K player, a smartphone with its screen on showing a colorful streaming app channel grid, and a tablet propped against a coffee mug showing a grid of movie poster thumbnails. Beside them, a hardcover Dutch-language book and a small ceramic vase with a single orange tulip stem (a quiet nod to Dutch culture, not branded). Behind the table, slightly out of focus, a large 4K HDR Smart TV mounted on the wall is on, showing a live Eredivisie football match (green grass field, players visible). Through a tall window in the background: dusk over an Amsterdam canal with classic Dutch gabled houses and water reflections. Soft cyan ambient bias-light glows from behind the TV. Deep navy walls, clean Scandinavian-meets-Dutch design. Sharp focus on the foreground devices, shallow depth of field. Magazine-quality product-lifestyle photography, shot on a Sony A7R V with a 50mm lens, evening interior. Photo-realistic, real photograph of real streaming hardware in an actual Dutch living room.',
  },

  // Trial showcase
  {
    id: 'trial-4k-streaming',
    outputRel: 'images/trial-4k-streaming.jpg',
    aspectRatio: '4:3',
    subject:
      'Abstract concept of pristine 4K streaming: ultra-sharp horizontal bands of cyan light forming a TV silhouette, premium tech aesthetic, edges fading to deep navy.',
  },
  {
    id: 'trial-sports',
    outputRel: 'images/trial-sports.jpg',
    aspectRatio: '4:3',
    subject:
      'Abstract sports concept: stadium-floodlight silhouettes radiating cyan light beams across a navy field; a single ball silhouette glowing center. Aspirational, dynamic, no text.',
  },
  {
    id: 'trial-devices',
    outputRel: 'images/trial-devices.jpg',
    aspectRatio: '4:3',
    subject:
      'Family of streaming devices in a row — TV, tablet, phone, streaming stick — each glowing with a cyan signal pulse synced together. Flat illustration, no screen content, no text.',
  },
  {
    id: 'trial-live-channels',
    outputRel: 'images/trial-live-channels.jpg',
    aspectRatio: '4:3',
    subject:
      'Abstract grid of mini-TV silhouettes (5x4 layout) some pulsing cyan, some dim — symbolizing many live channels broadcasting simultaneously. No content visible inside the screens.',
  },
  {
    id: 'trial-vod',
    outputRel: 'images/trial-vod.jpg',
    aspectRatio: '4:3',
    subject:
      'Abstract VOD library: stacked rectangular cards floating in 3D space at varying depths, each with a cyan accent line — evokes a vast on-demand library. Soft depth of field, no readable titles.',
  },
];

function regionSpecs(region: string, theme: string): ImageSpec[] {
  return [
    {
      id: `${region}-coverage`,
      outputRel: `images/${region}-coverage.jpg`,
      aspectRatio: '4:3',
      subject: `Map-style abstract illustration of ${theme}. Coverage dots glowing cyan across a stylized navy map silhouette. Geographic without being a literal map.`,
    },
    {
      id: `${region}-epg`,
      outputRel: `images/${region}-epg.jpg`,
      aspectRatio: '4:3',
      subject: `Documentary photograph, real-life photo of an actual adult sitting on a deep navy sofa in a softly-lit modern living room, watching a large 4K HDR Smart TV mounted on the wall. The TV is ON and clearly displays an electronic program guide (EPG) — a real Smart TV channel guide interface with a vertical list of TV channel names down the left side, horizontal time slots across the top (e.g., 7:00, 7:30, 8:00 PM), and program titles arranged in a colored grid layout. One cell in the middle of the grid is highlighted in cyan to indicate the currently airing program. The EPG looks like an actual TiviMate / IPTV Smarters Pro / Samsung Tizen channel guide displayed on a real TV — photographically rendered, not illustrated. Subtle cyan ambient bias-light glows behind the TV. Real human in frame holding a TV remote, candid posture. Shot on Canon R5, 35mm f/2.8, evening interior, photojournalism style, magazine editorial quality, lifestyle photography. NO illustration, NO cartoon, NO animation — this is a real photograph of a real person watching a Smart TV displaying its EPG.`,
    },
    {
      id: `${region}-multi-device`,
      outputRel: `images/${region}-multi-device.jpg`,
      aspectRatio: '4:3',
      subject: `Multi-device IPTV concept for ${theme}: TV, smartphone, tablet, and streaming stick arranged as a cohesive set. Cyan connection lines unite them.`,
    },
  ];
}

export async function runMarketingImagesGenerate(flags: CliFlags) {
  if (flags.reset) {
    await resetBucket(BUCKET);
    console.log(`✓ Manifest bucket "${BUCKET}" reset`);
  }

  const stats = await getStats(BUCKET);
  const todo = SPECS.filter((s) => !stats.completed.includes(s.id));
  const subset = flags.limit ? todo.slice(0, flags.limit) : todo;

  console.log(
    `Marketing images: ${SPECS.length} total, ${stats.completed.length} done, processing ${subset.length} this run.`
  );

  if (subset.length === 0) {
    console.log('Nothing to do.');
    return;
  }

  await Promise.all(
    subset.map((spec) =>
      limit(async () => {
        try {
          const outputPath = path.join(PUBLIC_DIR, spec.outputRel);
          const prompt = buildImagePrompt(spec.subject, spec.aspectRatio);

          console.log(`  → ${spec.id} → ${path.join('public', spec.outputRel)}`);

          if (flags.dryRun) {
            console.log(`    DRY-RUN provider=${spec.provider ?? 'imagen'} prompt: ${spec.subject.slice(0, 180)}...`);
          } else {
            await backupFile(outputPath); // best-effort backup of original (no-op if missing)
            if (spec.provider === 'openai') {
              await generateImageOpenAI({ prompt: spec.subject, aspectRatio: spec.aspectRatio, outputPath });
            } else {
              await generateImage({ prompt, aspectRatio: spec.aspectRatio, outputPath });
            }
            await markCompleted(BUCKET, spec.id);
          }
        } catch (e: any) {
          console.error(`  ✗ FAILED ${spec.id}: ${e.message}`);
          await markFailed(BUCKET, spec.id);
        }
      })
    )
  );

  console.log(`\nMarketing images done.`);
}
