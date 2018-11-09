<?php

namespace Drupal\university\Entity;

use Drupal\Core\Entity\ContentEntityInterface;
use Drupal\Core\Entity\EntityChangedInterface;
use Drupal\user\EntityOwnerInterface;

/**
 * Provides an interface for defining Instructor entities.
 *
 * @ingroup university
 */
interface InstructorInterface extends ContentEntityInterface, EntityChangedInterface, EntityOwnerInterface {

  // Add get/set methods for your configuration properties here.

  /**
   * Gets the Instructor name.
   *
   * @return string
   *   Name of the Instructor.
   */
  public function getName();

  /**
   * Sets the Instructor name.
   *
   * @param string $name
   *   The Instructor name.
   *
   * @return \Drupal\university\Entity\InstructorInterface
   *   The called Instructor entity.
   */
  public function setName($name);

  /**
   * Gets the Instructor creation timestamp.
   *
   * @return int
   *   Creation timestamp of the Instructor.
   */
  public function getCreatedTime();

  /**
   * Sets the Instructor creation timestamp.
   *
   * @param int $timestamp
   *   The Instructor creation timestamp.
   *
   * @return \Drupal\university\Entity\InstructorInterface
   *   The called Instructor entity.
   */
  public function setCreatedTime($timestamp);

  /**
   * Returns the Instructor published status indicator.
   *
   * Unpublished Instructor are only visible to restricted users.
   *
   * @return bool
   *   TRUE if the Instructor is published.
   */
  public function isPublished();

  /**
   * Sets the published status of a Instructor.
   *
   * @param bool $published
   *   TRUE to set this Instructor to published, FALSE to set it to unpublished.
   *
   * @return \Drupal\university\Entity\InstructorInterface
   *   The called Instructor entity.
   */
  public function setPublished($published);

}
