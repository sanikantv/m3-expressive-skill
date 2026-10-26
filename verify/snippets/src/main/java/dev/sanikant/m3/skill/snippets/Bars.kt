package dev.sanikant.m3.skill.snippets

import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.offset
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.material3.FloatingToolbarDefaults
import androidx.compose.material3.FloatingToolbarExitDirection
import androidx.compose.material3.HorizontalFloatingToolbar
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.LargeFlexibleTopAppBar
import androidx.compose.material3.ListItem
import androidx.compose.material3.Scaffold
import androidx.compose.material3.Text
import androidx.compose.material3.TopAppBarDefaults
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.vector.ImageVector
import androidx.compose.ui.input.nestedscroll.nestedScroll
import androidx.compose.ui.zIndex

// region flexible-top-app-bar
@Composable
fun InboxScreen(items: List<String>, backIcon: ImageVector, onBack: () -> Unit) {
    val scrollBehavior = TopAppBarDefaults.exitUntilCollapsedScrollBehavior()
    Scaffold(
        modifier = Modifier.nestedScroll(scrollBehavior.nestedScrollConnection),
        topBar = {
            // Flexible app bars add a subtitle slot and centred or start-aligned titles.
            LargeFlexibleTopAppBar(
                title = { Text("Inbox") },
                subtitle = { Text("${items.size} unread") },
                navigationIcon = {
                    IconButton(onClick = onBack) { Icon(backIcon, contentDescription = "Back") }
                },
                scrollBehavior = scrollBehavior,
            )
        },
    ) { padding ->
        LazyColumn(contentPadding = padding) {
            items(items) { ListItem { Text(it) } }
        }
    }
}
// endregion

// region floating-toolbar
@Composable
fun EditorScreen(
    lines: List<String>,
    toolIcons: List<Pair<ImageVector, String>>,
    addIcon: ImageVector,
    onAdd: () -> Unit,
) {
    // Floating toolbars replace the bottom app bar in M3 Expressive. They hide on scroll down.
    val exitAlways = FloatingToolbarDefaults.exitAlwaysScrollBehavior(
        exitDirection = FloatingToolbarExitDirection.Bottom,
    )
    Scaffold(modifier = Modifier.nestedScroll(exitAlways)) { padding ->
        Box(Modifier.padding(padding)) {
            LazyColumn {
                items(lines) { ListItem { Text(it) } }
            }
            HorizontalFloatingToolbar(
                expanded = true,
                floatingActionButton = {
                    FloatingToolbarDefaults.VibrantFloatingActionButton(onClick = onAdd) {
                        Icon(addIcon, contentDescription = "Add")
                    }
                },
                colors = FloatingToolbarDefaults.vibrantFloatingToolbarColors(),
                scrollBehavior = exitAlways,
                modifier = Modifier
                    .align(Alignment.BottomCenter)
                    .offset(y = -FloatingToolbarDefaults.ScreenOffset)
                    .zIndex(1f),
            ) {
                toolIcons.forEach { (icon, label) ->
                    IconButton(onClick = {}) { Icon(icon, contentDescription = label) }
                }
            }
        }
    }
}
// endregion
