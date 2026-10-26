package dev.sanikant.m3.skill.snippets

import androidx.compose.animation.animateColorAsState
import androidx.compose.animation.core.animateDpAsState
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.MaterialTheme
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp

// region motion-custom
@Composable
fun SelectableTile(selected: Boolean, modifier: Modifier = Modifier) {
    val motion = MaterialTheme.motionScheme
    // Size and corner changes are spatial: they may overshoot (bounce) with MotionScheme.expressive().
    val size by animateDpAsState(
        targetValue = if (selected) 120.dp else 96.dp,
        animationSpec = motion.defaultSpatialSpec(),
        label = "size",
    )
    val corner by animateDpAsState(
        targetValue = if (selected) 48.dp else 16.dp,
        animationSpec = motion.fastSpatialSpec(),
        label = "corner",
    )
    // Color and alpha are effects: they never overshoot, in either scheme.
    val color by animateColorAsState(
        targetValue = if (selected) MaterialTheme.colorScheme.primaryContainer
        else MaterialTheme.colorScheme.surfaceContainerHigh,
        animationSpec = motion.defaultEffectsSpec(),
        label = "color",
    )
    Box(modifier.size(size).background(color, RoundedCornerShape(corner)))
}
// endregion
