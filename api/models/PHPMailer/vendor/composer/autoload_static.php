<?php

// autoload_static.php @generated by Composer

namespace Composer\Autoload;

class ComposerStaticInit1e21a5e0b2123c2122654dc3ca58e43b
{
    public static $prefixLengthsPsr4 = array (
        'P' => 
        array (
            'PHPMailer\\PHPMailer\\' => 20,
        ),
    );

    public static $prefixDirsPsr4 = array (
        'PHPMailer\\PHPMailer\\' => 
        array (
            0 => __DIR__ . '/..' . '/phpmailer/phpmailer/src',
        ),
    );

    public static $classMap = array (
        'Composer\\InstalledVersions' => __DIR__ . '/..' . '/composer/InstalledVersions.php',
    );

    public static function getInitializer(ClassLoader $loader)
    {
        return \Closure::bind(function () use ($loader) {
            $loader->prefixLengthsPsr4 = ComposerStaticInit1e21a5e0b2123c2122654dc3ca58e43b::$prefixLengthsPsr4;
            $loader->prefixDirsPsr4 = ComposerStaticInit1e21a5e0b2123c2122654dc3ca58e43b::$prefixDirsPsr4;
            $loader->classMap = ComposerStaticInit1e21a5e0b2123c2122654dc3ca58e43b::$classMap;

        }, null, ClassLoader::class);
    }
}
