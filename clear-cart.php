<?php
/**
 * Plugin Name: Smart4k Checkout Optimizer
 * Description: Empties cart before adding new items and hides the annoying "added to cart" notices.
 * Author: Antigravity
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

// 1. Clear cart before adding a new product
add_filter( 'woocommerce_add_to_cart_validation', 'smart4k_clear_cart_before_add', 10, 3 );
function smart4k_clear_cart_before_add( $passed, $product_id, $quantity ) {
    if ( function_exists( 'WC' ) && ! WC()->cart->is_empty() ) {
        WC()->cart->empty_cart();
    }
    return $passed;
}

// 2. Hide "item has been added to your cart" success message
add_filter( 'wc_add_to_cart_message_html', '__return_empty_string' );
add_filter( 'woocommerce_cart_item_removed_notice_type', '__return_false' );
