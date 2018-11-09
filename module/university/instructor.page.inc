<?php

/**
 * @file
 * Contains instructor.page.inc.
 *
 * Page callback for Instructor entities.
 */

use Drupal\Core\Render\Element;

/**
 * Prepares variables for Instructor templates.
 *
 * Default template: instructor.html.twig.
 *
 * @param array $variables
 *   An associative array containing:
 *   - elements: An associative array containing the user information and any
 *   - attributes: HTML attributes for the containing element.
 */
function template_preprocess_instructor(array &$variables) {
  // Fetch Instructor Entity Object.
  $instructor = $variables['elements']['#instructor'];

  // Helpful $content variable for templates.
  foreach (Element::children($variables['elements']) as $key) {
    $variables['content'][$key] = $variables['elements'][$key];
  }
}
