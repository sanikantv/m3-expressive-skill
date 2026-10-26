package dev.sanikant.m3.skill.snippets

import androidx.activity.compose.BackHandler
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.lazy.LazyListState
import androidx.compose.material3.FloatingActionButtonMenu
import androidx.compose.material3.FloatingActionButtonMenuItem
import androidx.compose.material3.Icon
import androidx.compose.material3.MediumFloatingActionButton
import androidx.compose.material3.Text
import androidx.compose.material3.ToggleFloatingActionButton
import androidx.compose.material3.ToggleFloatingActionButtonDefaults.animateIcon
import androidx.compose.material3.animateFloatingActionButton
import androidx.compose.runtime.Composable
import androidx.compose.runtime.derivedStateOf
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.saveable.rememberSaveable
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.vector.ImageVector
import androidx.compose.ui.graphics.vector.rememberVectorPainter
import androidx.compose.ui.semantics.contentDescription
import androidx.compose.ui.semantics.semantics
import androidx.compose.ui.semantics.stateDescription
import androidx.compose.ui.semantics.traversalIndex

// region fab-menu
data class FabAction(val icon: ImageVector, val label: String, val onClick: () -> Unit)

@Composable
fun ComposeFabMenu(
    actions: List<FabAction>,
    addIcon: ImageVector,
    closeIcon: ImageVector,
    listState: LazyListState,
    modifier: Modifier = Modifier,
) {
    var expanded by rememberSaveable { mutableStateOf(false) }
    BackHandler(expanded) { expanded = false }
    val fabVisible by remember {
        derivedStateOf { listState.firstVisibleItemIndex == 0 || !listState.canScrollForward }
    }

    Box(modifier.fillMaxSize()) {
        FloatingActionButtonMenu(
            modifier = Modifier.align(Alignment.BottomEnd),
            expanded = expanded,
            button = {
                ToggleFloatingActionButton(
                    checked = expanded,
                    onCheckedChange = { expanded = it },
                    modifier = Modifier
                        .semantics {
                            traversalIndex = -1f
                            stateDescription = if (expanded) "Expanded" else "Collapsed"
                            contentDescription = "Toggle menu"
                        }
                        .animateFloatingActionButton(
                            visible = fabVisible || expanded,
                            alignment = Alignment.BottomEnd,
                        ),
                ) {
                    // checkedProgress goes 0 -> 1 as the FAB morphs into the close button.
                    val icon by remember { derivedStateOf { if (checkedProgress > 0.5f) closeIcon else addIcon } }
                    Icon(
                        painter = rememberVectorPainter(icon),
                        contentDescription = null,
                        modifier = Modifier.animateIcon({ checkedProgress }),
                    )
                }
            },
        ) {
            actions.forEach { action ->
                FloatingActionButtonMenuItem(
                    onClick = { expanded = false; action.onClick() },
                    icon = { Icon(action.icon, contentDescription = null) },
                    text = { Text(action.label) },
                )
            }
        }
    }
}
// endregion

// region medium-fab
@Composable
fun NewItemFab(icon: ImageVector, onClick: () -> Unit) {
    // FAB sizes: FloatingActionButton 56dp, MediumFloatingActionButton 80dp (new in 1.5.0),
    // LargeFloatingActionButton 96dp. M3 Expressive guidance steers away from the 40dp small FAB.
    MediumFloatingActionButton(onClick = onClick) { Icon(icon, contentDescription = "New item") }
}
// endregion
