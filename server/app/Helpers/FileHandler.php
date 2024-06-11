<?php

namespace App\Helpers;

use Illuminate\Http\UploadedFile;

class FileHandler
{
  public static function storeFile(UploadedFile $file)
  {
    $filePath = $file->store('public/uploads');
    return basename($filePath);
  }
}
