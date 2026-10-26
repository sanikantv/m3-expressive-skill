package dev.sanikant.m3.skill.snippets

import android.os.Build
import androidx.compose.foundation.isSystemInDarkTheme
import androidx.compose.foundation.layout.Column
import androidx.compose.material3.Card
import androidx.compose.material3.MaterialExpressiveTheme
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.MotionScheme
import androidx.compose.material3.Text
import androidx.compose.material3.darkColorScheme
import androidx.compose.material3.dynamicDarkColorScheme
import androidx.compose.material3.dynamicLightColorScheme
import androidx.compose.material3.expressiveLightColorScheme
import androidx.compose.runtime.Composable
import androidx.compose.ui.platform.LocalContext

// region theme
@Composable
fun AppTheme(
    darkTheme: Boolean = isSystemInDarkTheme(),
    dynamicColor: Boolean = true,
    content: @Composable () -> Unit,
) {
    val context = LocalContext.current
    val colorScheme = when {
        dynamicColor && Build.VERSION.SDK_INT >= Build.VERSION_CODES.S ->
            if (darkTheme) dynamicDarkColorScheme(context) else dynamicLightColorScheme(context)
        darkTheme -> darkColorScheme()
        else -> expressiveLightColorScheme()
    }
    MaterialExpressiveTheme(
        colorScheme = colorScheme,
        motionScheme = MotionScheme.expressive(),
        content = content,
    )
}
// endregion

// region emphasized-type
@Composable
fun PlanHeader(name: String, price: String) {
    Column {
        // Emphasized = same size as the baseline style, heavier weight. Use it for the one thing
        // that should win attention, not for every heading.
        Text(name, style = MaterialTheme.typography.titleLargeEmphasized)
        Text(price, style = MaterialTheme.typography.displaySmallEmphasized)
        Text("Billed yearly", style = MaterialTheme.typography.bodyMedium)
    }
}
// endregion

// region increased-shapes
@Composable
fun HeroCard(content: @Composable () -> Unit) {
    // largeIncreased (20dp), extraLargeIncreased (32dp) and extraExtraLarge (48dp) are new steps.
    Card(shape = MaterialTheme.shapes.extraLargeIncreased) { content() }
}
// endregion
