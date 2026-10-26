package dev.sanikant.m3.skill.snippets

import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.text.input.rememberTextFieldState
import androidx.compose.foundation.text.input.setTextAndPlaceCursorAtEnd
import androidx.compose.material3.ExpandedFullScreenSearchBar
import androidx.compose.material3.ListItem
import androidx.compose.material3.SearchBar
import androidx.compose.material3.SearchBarDefaults
import androidx.compose.material3.Text
import androidx.compose.material3.rememberSearchBarState
import androidx.compose.runtime.Composable
import androidx.compose.runtime.rememberCoroutineScope
import kotlinx.coroutines.launch

// region search-bar
@Composable
fun AppSearch(suggestions: (String) -> List<String>, onSearch: (String) -> Unit) {
    // State-based search bar. The old SearchBar(query, onQueryChange, active, …) is deprecated.
    val searchBarState = rememberSearchBarState()
    val textFieldState = rememberTextFieldState()
    val scope = rememberCoroutineScope()
    val inputField = @Composable {
        SearchBarDefaults.InputField(
            textFieldState = textFieldState,
            searchBarState = searchBarState,
            onSearch = { query ->
                onSearch(query)
                scope.launch { searchBarState.animateToCollapsed() }
            },
            placeholder = { Text("Search") },
        )
    }

    SearchBar(state = searchBarState, inputField = inputField)
    ExpandedFullScreenSearchBar(state = searchBarState, inputField = inputField) {
        LazyColumn {
            items(suggestions(textFieldState.text.toString())) { suggestion ->
                ListItem(
                    onClick = {
                        textFieldState.setTextAndPlaceCursorAtEnd(suggestion)
                        onSearch(suggestion)
                        scope.launch { searchBarState.animateToCollapsed() }
                    },
                ) { Text(suggestion) }
            }
        }
    }
}
// endregion
