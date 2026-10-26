// Every Kotlin sample in the skill lives here between `// region <name>` and `// endregion`.
// scripts/sync_snippets.py copies the regions into the reference .md files, so
// `./gradlew :snippets:assembleDebug` proves the code an agent reads actually compiles.
plugins {
    alias(libs.plugins.android.library)
    alias(libs.plugins.kotlin.compose)
}

android {
    namespace = "dev.sanikant.m3.skill.snippets"
    compileSdk {
        version = release(37)
    }
    defaultConfig {
        minSdk = 26
    }
    compileOptions {
        sourceCompatibility = JavaVersion.VERSION_17
        targetCompatibility = JavaVersion.VERSION_17
    }
    buildFeatures {
        compose = true
    }
}

dependencies {
    implementation(platform(libs.androidx.compose.bom))
    implementation(libs.androidx.compose.material3)
    implementation(libs.androidx.compose.ui)
    implementation(libs.androidx.graphics.shapes)
    implementation(libs.androidx.activity.compose)
}
