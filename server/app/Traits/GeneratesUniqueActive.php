<?php

namespace App\Traits;

use ParagonIE\ConstantTime\Base64UrlSafe;

trait GeneratesUniqueActive
{
  protected static function generateUniqueActive()
  {
    do {
      $randomBytes = random_bytes(32);
      $active = Base64UrlSafe::encodeUnpadded($randomBytes);
    } while (self::where('active', $active)->exists());

    return $active;
  }
}