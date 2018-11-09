<?php

namespace Drupal\university;

use Drupal\Core\Entity\EntityAccessControlHandler;
use Drupal\Core\Entity\EntityInterface;
use Drupal\Core\Session\AccountInterface;
use Drupal\Core\Access\AccessResult;

/**
 * Access controller for the Course entity.
 *
 * @see \Drupal\university\Entity\Course.
 */
class CourseAccessControlHandler extends EntityAccessControlHandler {

  /**
   * {@inheritdoc}
   */
  protected function checkAccess(EntityInterface $entity, $operation, AccountInterface $account) {
    /** @var \Drupal\university\Entity\CourseInterface $entity */
    switch ($operation) {
      case 'view':
        if (!$entity->isPublished()) {
          return AccessResult::allowedIfHasPermission($account, 'view unpublished course entities');
        }
        return AccessResult::allowedIfHasPermission($account, 'view published course entities');

      case 'update':
        return AccessResult::allowedIfHasPermission($account, 'edit course entities');

      case 'delete':
        return AccessResult::allowedIfHasPermission($account, 'delete course entities');
    }

    // Unknown operation, no opinion.
    return AccessResult::neutral();
  }

  /**
   * {@inheritdoc}
   */
  protected function checkCreateAccess(AccountInterface $account, array $context, $entity_bundle = NULL) {
    return AccessResult::allowedIfHasPermission($account, 'add course entities');
  }

}
