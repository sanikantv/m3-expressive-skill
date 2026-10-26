package dev.sanikant.m3.skill.snippets

import androidx.compose.animation.core.animateFloatAsState
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.FlowRow
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.heightIn
import androidx.compose.foundation.layout.size
import androidx.compose.material3.Button
import androidx.compose.material3.ButtonDefaults
import androidx.compose.material3.ButtonGroup
import androidx.compose.material3.ButtonGroupDefaults
import androidx.compose.material3.FilledIconButton
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButtonDefaults
import androidx.compose.material3.SplitButtonDefaults
import androidx.compose.material3.SplitButtonLayout
import androidx.compose.material3.Text
import androidx.compose.material3.ToggleButton
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableIntStateOf
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.saveable.rememberSaveable
import androidx.compose.runtime.setValue
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.graphicsLayer
import androidx.compose.ui.graphics.vector.ImageVector
import androidx.compose.ui.semantics.Role
import androidx.compose.ui.semantics.role
import androidx.compose.ui.semantics.semantics
import androidx.compose.ui.semantics.stateDescription

// region button-shapes
@Composable
fun MorphingButton(onClick: () -> Unit) {
    // Passing `shapes` switches to the overload whose corners morph (round -> square) on press.
    Button(onClick = onClick, shapes = ButtonDefaults.shapes()) { Text("Continue") }
}
// endregion

// region button-sizes
@Composable
fun MediumCta(icon: ImageVector, onClick: () -> Unit) {
    // Sizes: ExtraSmall 32dp, Small 40dp (default), Medium 56dp, Large 96dp, ExtraLarge 136dp.
    val height = ButtonDefaults.MediumContainerHeight
    Button(
        onClick = onClick,
        modifier = Modifier.heightIn(height),
        shapes = ButtonDefaults.shapesFor(height),
        contentPadding = ButtonDefaults.contentPaddingFor(height, hasStartIcon = true),
    ) {
        Icon(icon, contentDescription = null, modifier = Modifier.size(ButtonDefaults.iconSizeFor(height)))
        Spacer(Modifier.size(ButtonDefaults.iconSpacingFor(height)))
        Text("Start free trial", style = ButtonDefaults.textStyleFor(height))
    }
}
// endregion

// region icon-button-shapes
@Composable
fun AddButton(icon: ImageVector, onClick: () -> Unit) {
    FilledIconButton(
        onClick = onClick,
        shapes = IconButtonDefaults.shapes(),
        modifier = Modifier.size(IconButtonDefaults.mediumContainerSize()),
    ) {
        Icon(icon, contentDescription = "Add", modifier = Modifier.size(IconButtonDefaults.mediumIconSize))
    }
}
// endregion

// region toggle-button
@Composable
fun FollowButton() {
    var following by rememberSaveable { mutableStateOf(false) }
    // Checked state changes both color and shape (round when off, square when on).
    ToggleButton(checked = following, onCheckedChange = { following = it }) {
        Text(if (following) "Following" else "Follow")
    }
}
// endregion

// region connected-button-group
@Composable
fun PeriodPicker(options: List<String>) {
    var selected by rememberSaveable { mutableIntStateOf(0) }
    // Connected button group = single-select segmented control with expressive shapes.
    // Replaces SingleChoiceSegmentedButtonRow when you want the M3 Expressive look.
    FlowRow(horizontalArrangement = Arrangement.spacedBy(ButtonGroupDefaults.ConnectedSpaceBetween)) {
        options.forEachIndexed { index, label ->
            ToggleButton(
                checked = selected == index,
                onCheckedChange = { selected = index },
                shapes = when (index) {
                    0 -> ButtonGroupDefaults.connectedLeadingButtonShapes()
                    options.lastIndex -> ButtonGroupDefaults.connectedTrailingButtonShapes()
                    else -> ButtonGroupDefaults.connectedMiddleButtonShapes()
                },
                modifier = Modifier.weight(1f).semantics { role = Role.RadioButton },
            ) { Text(label) }
        }
    }
}
// endregion

// region button-group-overflow
@Composable
fun EditorActions(onAction: (String) -> Unit) {
    // Standard button group: neighbours squeeze when one is pressed; extra items go to overflow.
    ButtonGroup(
        overflowIndicator = { menuState -> ButtonGroupDefaults.OverflowIndicator(menuState = menuState) },
    ) {
        listOf("Bold", "Italic", "Underline", "Strike", "Code", "Link").forEach { label ->
            clickableItem(onClick = { onAction(label) }, label = label)
        }
    }
}
// endregion

// region split-button
@Composable
fun SaveSplitButton(arrowDown: ImageVector, onSave: () -> Unit, onMenu: (Boolean) -> Unit) {
    var menuOpen by rememberSaveable { mutableStateOf(false) }
    SplitButtonLayout(
        leadingButton = {
            SplitButtonDefaults.LeadingButton(onClick = onSave) { Text("Save") }
        },
        trailingButton = {
            SplitButtonDefaults.TrailingButton(
                checked = menuOpen,
                onCheckedChange = { menuOpen = it; onMenu(it) },
                modifier = Modifier.semantics {
                    stateDescription = if (menuOpen) "Expanded" else "Collapsed"
                },
            ) {
                val rotation by animateFloatAsState(if (menuOpen) 180f else 0f, label = "arrow")
                Icon(
                    arrowDown,
                    contentDescription = "More save options",
                    modifier = Modifier
                        .size(SplitButtonDefaults.TrailingIconSize)
                        .graphicsLayer { rotationZ = rotation },
                )
            }
        },
    )
}
// endregion
