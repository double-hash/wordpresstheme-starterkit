<?php
function custom_scripts() {
  wp_register_style('main-style', get_template_directory_uri().'assets/screen.min.css', array(), true);
  wp_enqueue_style('main-style');
  wp_enqueue_script('main-script', get_template_directory_uri() . 'assets/script.js', array ());
}

// function wpm_custom_post_type() {
// 	register_post_type( 'custompost', array(
// 		'label'               => __( 'Custom Post'),
// 		'description'         => __( 'Tous sur Custom Post'),
// 		'labels'              =>
// 			array(
// 			'name'                => _x( 'Custom Posts', 'Post Type General Name'),
// 			'singular_name'       => _x( 'Custom Post', 'Post Type Singular Name'),
// 			'menu_name'           => __( 'Custom Posts')
// 			),
// 		'menu_icon'           => 'dashicons-lightbulb',
// 		'supports'            => array( 'title', 'editor', 'thumbnail',),
// 		'hierarchical'        => false,
// 		'public'              => true,
// 		'has_archive'         => true,
// 		'rewrite'			  => array( 'slug' => 'customposts'),
// 		)
// 	);
// }


// function theme_setup() {
//   add_theme_support( 'title-tag' );
//   add_theme_support( 'post-thumbnails', array( 'releases', 'artists', 'page' ) );
// };

add_action( 'wp_enqueue_scripts', 'custom_scripts' );
// add_action( 'init', 'wpm_custom_post_type', 0 );
// add_action( 'after_setup_theme', 'theme_setup' );
