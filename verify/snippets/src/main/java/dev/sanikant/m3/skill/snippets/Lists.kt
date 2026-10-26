package dev.sanikant.m3.skill.snippets

import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.material3.ListItem
import androidx.compose.material3.ListItemDefaults
import androidx.compose.material3.SegmentedListItem
import androidx.compose.material3.Switch
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable

data class Setting(val title: String, val summary: String, val enabled: Boolean)

// region segmented-list
@Composable
fun SettingsGroup(settings: List<Setting>, onToggle: (Int, Boolean) -> Unit) {
    // Segmented list items: one rounded group, small gaps, larger corners on the first and last.
    Column(verticalArrangement = Arrangement.spacedBy(ListItemDefaults.SegmentedGap)) {
        settings.forEachIndexed { index, setting ->
            SegmentedListItem(
                checked = setting.enabled,
                onCheckedChange = { onToggle(index, it) },
                shapes = ListItemDefaults.segmentedShapes(index = index, count = settings.size),
                supportingContent = { Text(setting.summary) },
                trailingContent = { Switch(checked = setting.enabled, onCheckedChange = null) },
            ) {
                Text(setting.title)
            }
        }
    }
}
// endregion

// region list-item-migration
@Composable
fun WifiRow(network: String, onClick: () -> Unit) {
    // 1.5.0: the headline is the trailing content lambda. ListItem(headlineContent = …) is deprecated.
    // The onClick overload makes the whole row clickable with the right semantics.
    ListItem(onClick = onClick, supportingContent = { Text(network) }) {
        Text("Wi-Fi")
    }
}
// endregion
