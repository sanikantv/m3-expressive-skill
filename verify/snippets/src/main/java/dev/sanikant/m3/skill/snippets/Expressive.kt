@file:OptIn(ExperimentalMaterial3ExpressiveApi::class)

package dev.sanikant.m3.skill.snippets

import android.content.res.AssetManager
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxHeight
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.material3.ExperimentalMaterial3ExpressiveApi
import androidx.compose.material3.FloatingToolbarDefaults
import androidx.compose.material3.HorizontalFloatingToolbar
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.MaterialShapes
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Typography
import androidx.compose.material3.toShape
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.vector.ImageVector
import androidx.compose.ui.text.font.Font
import androidx.compose.ui.text.font.FontFamily
import androidx.compose.ui.text.font.FontVariation
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp

// region variable-font-emphasis
/**
 * A variable font gives emphasis more range than weight alone: wider and heavier for the
 * emphasized display styles, like Google's Gg specimen (weight 850, width 130 vs 500 / 100).
 * Google Sans Flex has wght 1..1000, wdth 25..151 and ROND 0..100 axes.
 */
fun expressiveTypography(assets: AssetManager): Typography {
    fun flex(weight: Int, width: Float = 100f, round: Float = 0f) = FontFamily(
        Font(
            path = "fonts/GoogleSansFlex.ttf",
            assetManager = assets,
            weight = FontWeight(weight),
            variationSettings = FontVariation.Settings(
                FontVariation.weight(weight),
                FontVariation.width(width),
                FontVariation.Setting("ROND", round),
            ),
        ),
    )
    val regular = flex(400)
    val medium = flex(500)
    val heroWide = flex(weight = 850, width = 130f, round = 100f)
    val base = Typography()
    return Typography(
        displayLarge = base.displayLarge.copy(fontFamily = regular),
        headlineMedium = base.headlineMedium.copy(fontFamily = regular),
        titleLarge = base.titleLarge.copy(fontFamily = regular),
        bodyLarge = base.bodyLarge.copy(fontFamily = regular),
        labelLarge = base.labelLarge.copy(fontFamily = medium),
        // Same size and line height as the baseline role; only the font settings change.
        displayLargeEmphasized = base.displayLargeEmphasized.copy(fontFamily = heroWide),
        headlineMediumEmphasized = base.headlineMediumEmphasized.copy(fontFamily = heroWide),
        titleLargeEmphasized = base.titleLargeEmphasized.copy(fontFamily = flex(700)),
        labelLargeEmphasized = base.labelLargeEmphasized.copy(fontFamily = flex(700)),
    )
}
// endregion

// region shape-highlight-chart
/**
 * Shapes as highlights in data, like Google's steps chart: plain pill bars, and a Sunny-shaped
 * check badge only on the days that hit the goal. The badge is decoration, so the bar still says
 * what it means (contentDescription on the column, not on the shape).
 */
@Composable
fun WeekChart(steps: List<Int>, goal: Int, check: ImageVector, max: Int = 15_000) {
    Row(
        modifier = Modifier.height(200.dp),
        horizontalArrangement = Arrangement.spacedBy(6.dp),
        verticalAlignment = Alignment.Bottom,
    ) {
        steps.forEach { value ->
            val hit = value >= goal
            Column(
                modifier = Modifier.width(40.dp).fillMaxHeight(),
                verticalArrangement = Arrangement.Bottom,
                horizontalAlignment = Alignment.CenterHorizontally,
            ) {
                Box(
                    modifier = Modifier
                        .width(40.dp)
                        .height((200 * value / max).coerceAtLeast(40).dp)
                        .background(
                            if (hit) MaterialTheme.colorScheme.tertiaryContainer else MaterialTheme.colorScheme.primary,
                            CircleShape,
                        ),
                    contentAlignment = Alignment.TopCenter,
                ) {
                    if (hit) {
                        Box(
                            Modifier
                                .size(36.dp)
                                .background(MaterialTheme.colorScheme.tertiary, MaterialShapes.Sunny.toShape()),
                            contentAlignment = Alignment.Center,
                        ) {
                            Icon(check, contentDescription = null, tint = MaterialTheme.colorScheme.onTertiary)
                        }
                    }
                }
            }
        }
    }
}
// endregion

// region docked-to-floating
/**
 * Google's before/after: a docked bottom bar with a FAB becomes a floating toolbar plus a
 * separate FAB in a contrasting shape and color. The FAB is the primary action, so it gets the
 * vibrant container and the square-ish shape; the toolbar stays a pill.
 */
@Composable
fun ComposeActions(actions: List<Pair<ImageVector, String>>, primary: ImageVector, onPrimary: () -> Unit) {
    HorizontalFloatingToolbar(
        expanded = true,
        floatingActionButton = {
            FloatingToolbarDefaults.VibrantFloatingActionButton(onClick = onPrimary) {
                Icon(primary, contentDescription = "Compose")
            }
        },
    ) {
        actions.forEach { (icon, label) ->
            IconButton(onClick = {}) { Icon(icon, contentDescription = label) }
        }
    }
}
// endregion
