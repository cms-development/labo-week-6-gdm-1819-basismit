<?php

namespace Drupal\university\Entity;

use Drupal\Core\Entity\ContentEntityInterface;
use Drupal\Core\Entity\EntityChangedInterface;
use Drupal\user\EntityOwnerInterface;

/**
 * Provides an interface for defining Student entities.
 *
 * @ingroup university
 */
interface StudentInterface extends ContentEntityInterface, EntityChangedInterface, EntityOwnerInterface {

  // Add get/set methods for your configuration properties here.

  /**
   * Gets the Student name.
   *
   * @return string
   *   Name of the Student.
   */
  public function getName();

  /**
   * Sets the Student name.
   *
   * @param string $name
   *   The Student name.
   *
   * @return \Drupal\university\Entity\StudentInterface
   *   The called Student entity.
   */
  public function setName($name);

  /**
   * Gets the Student creation timestamp.
   *
   * @return int
   *   Creation timestamp of the Student.
   */
  public function getCreatedTime();

  /**
   * Sets the Student creation timestamp.
   *
   * @param int $timestamp
   *   The Student creation timestamp.
   *
   * @return \Drupal\university\Entity\StudentInterface
   *   The called Student entity.
   */
  public function setCreatedTime($timestamp);

  /**
   * Returns the Student published status indicator.
   *
   * Unpublished Student are only visible to restricted users.
   *
   * @return bool
   *   TRUE if the Student is published.
   */
  public function isPublished();

  /**
   * Sets the published status of a Student.
   *
   * @param bool $published
   *   TRUE to set this Student to published, FALSE to set it to unpublished.
   *
   * @return \Drupal\university\Entity\StudentInterface
   *   The called Student entity.
   */
  public function setPublished($published);

}
