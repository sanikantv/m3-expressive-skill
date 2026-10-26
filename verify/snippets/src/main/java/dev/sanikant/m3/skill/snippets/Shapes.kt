@file:OptIn(ExperimentalMaterial3ExpressiveApi::class)

package dev.sanikant.m3.skill.snippets

import androidx.compose.animation.core.animateFloatAsState
import androidx.compose.foundation.Image
import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.size
import androidx.compose.material3.ExperimentalMaterial3ExpressiveApi
import androidx.compose.material3.MaterialShapes
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.toPath
import androidx.compose.material3.toShape
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.geometry.Size
import androidx.compose.ui.graphics.Matrix
import androidx.compose.ui.graphics.Outline
import androidx.compose.ui.graphics.Path
import androidx.compose.ui.graphics.Shape
import androidx.compose.ui.graphics.painter.Painter
import androidx.compose.ui.layout.ContentScale
import androidx.compose.ui.unit.Density
import androidx.compose.ui.unit.LayoutDirection
import androidx.compose.ui.unit.dp
import androidx.graphics.shapes.Morph

// region shape-avatar
@Composable
fun CookieAvatar(photo: Painter, contentDescription: String?) {
    // Abstract shapes are for images and decoration, never for text-heavy containers.
    Image(
        painter = photo,
        contentDescription = contentDescription,
        contentScale = ContentScale.Crop,
        modifier = Modifier.size(72.dp).clip(MaterialShapes.Cookie9Sided.toShape()),
    )
}
// endregion

// region morph-shape
/** Draws [morph] at [progress] (0 = start polygon, 1 = end polygon), scaled to the layout size. */
class MorphShape(private val morph: Morph, private val progress: Float) : Shape {
    override fun createOutline(size: Size, layoutDirection: LayoutDirection, density: Density): Outline {
        val path = morph.toPath(progress = progress, path = Path())
        path.transform(Matrix().apply { scale(size.width, size.height) })
        return Outline.Generic(path)
    }
}
// endregion

// region morph-toggle
@Composable
fun MorphOnTap() {
    var selected by remember { mutableStateOf(false) }
    val morph = remember { Morph(MaterialShapes.Circle, MaterialShapes.Cookie9Sided) }
    val progress by animateFloatAsState(
        targetValue = if (selected) 1f else 0f,
        animationSpec = MaterialTheme.motionScheme.defaultSpatialSpec(),
        label = "morph",
    )
    Box(
        Modifier
            .size(96.dp)
            .background(MaterialTheme.colorScheme.primary, MorphShape(morph, progress))
            .clickable { selected = !selected },
    )
}
// endregion
