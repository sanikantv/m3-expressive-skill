package dev.sanikant.m3.skill.snippets

import androidx.compose.material3.Icon
import androidx.compose.material3.ShortNavigationBar
import androidx.compose.material3.ShortNavigationBarItem
import androidx.compose.material3.Text
import androidx.compose.material3.WideNavigationRail
import androidx.compose.material3.WideNavigationRailItem
import androidx.compose.material3.WideNavigationRailValue
import androidx.compose.material3.rememberWideNavigationRailState
import androidx.compose.runtime.Composable
import androidx.compose.ui.graphics.vector.ImageVector

data class Destination(val label: String, val icon: ImageVector)

// region short-navigation-bar
@Composable
fun BottomBar(destinations: List<Destination>, selected: Int, onSelect: (Int) -> Unit) {
    // ShortNavigationBar is the Expressive bottom bar: 64dp tall, 3 to 5 items on phones.
    // On medium widths set iconPosition = NavigationItemIconPosition.Start on the items.
    ShortNavigationBar {
        destinations.forEachIndexed { index, destination ->
            ShortNavigationBarItem(
                selected = selected == index,
                onClick = { onSelect(index) },
                icon = { Icon(destination.icon, contentDescription = null) },
                label = { Text(destination.label) },
            )
        }
    }
}
// endregion

// region wide-navigation-rail
@Composable
fun SideRail(destinations: List<Destination>, selected: Int, onSelect: (Int) -> Unit) {
    // For tablets and desktop. It expands in place, which is what M3 Expressive uses instead of a
    // navigation drawer. Show 3 to 7 items when collapsed.
    val state = rememberWideNavigationRailState(WideNavigationRailValue.Collapsed)
    val expanded = state.targetValue == WideNavigationRailValue.Expanded
    WideNavigationRail(state = state) {
        destinations.forEachIndexed { index, destination ->
            WideNavigationRailItem(
                selected = selected == index,
                onClick = { onSelect(index) },
                icon = { Icon(destination.icon, contentDescription = null) },
                label = { Text(destination.label) },
                railExpanded = expanded,
            )
        }
    }
}
// endregion
