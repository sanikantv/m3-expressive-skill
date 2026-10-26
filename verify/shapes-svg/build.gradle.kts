// Renders MaterialShapes to SVG paths and morph frames for the docs site (site/src/data/shapes.json).
// Run from verify/: ./gradlew :shapes-svg:run (writes ../site/src/data/shapes.json)
plugins {
    alias(libs.plugins.kotlin.jvm)
    application
}

kotlin {
    jvmToolchain(17)
}

application {
    mainClass.set("dev.sanikant.m3.skill.shapes.MainKt")
}

dependencies {
    implementation(libs.androidx.graphics.shapes.desktop)
    // graphics-shapes exposes FloatFloatPair (PointTransformer) but only declares collection at runtime.
    implementation("androidx.collection:collection-jvm:1.7.0")
}
