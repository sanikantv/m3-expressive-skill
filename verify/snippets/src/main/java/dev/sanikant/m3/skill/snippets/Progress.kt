package dev.sanikant.m3.skill.snippets

import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.material3.CircularWavyProgressIndicator
import androidx.compose.material3.ContainedLoadingIndicator
import androidx.compose.material3.ExperimentalMaterial3ExpressiveApi
import androidx.compose.material3.LinearWavyProgressIndicator
import androidx.compose.material3.LoadingIndicator
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier

// region wavy-progress
@Composable
fun DownloadProgress(progress: () -> Float) {
    // Wavy indicators are stable in 1.5.0. Use them for long, visible waits (downloads, uploads).
    LinearWavyProgressIndicator(progress = progress, modifier = Modifier.fillMaxWidth())
}

@Composable
fun SyncingSpinner() {
    CircularWavyProgressIndicator()
}
// endregion

// region loading-indicator
// LoadingIndicator is still experimental in 1.5.0-beta02, so opt in where you use it.
@OptIn(ExperimentalMaterial3ExpressiveApi::class)
@Composable
fun ScreenLoading() {
    // For short indeterminate waits (screen or content loading), instead of a circular spinner.
    Box(Modifier.fillMaxSize(), contentAlignment = Alignment.Center) {
        LoadingIndicator()
    }
}

@OptIn(ExperimentalMaterial3ExpressiveApi::class)
@Composable
fun ButtonLoading() {
    // Contained = on a filled circle, for use over content or inside pull-to-refresh.
    ContainedLoadingIndicator()
}
// endregion
