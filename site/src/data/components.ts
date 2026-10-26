// Component pages: slug, title, icon, one line. Used by the home page, /components/ and llms.txt.
export const COMPONENTS = [
  { slug: 'buttons', title: 'Buttons', icon: 'smart_button', blurb: 'Press-morphing shapes and five sizes, from 32 to 136dp.' },
  { slug: 'toggle-buttons', title: 'Toggle buttons', icon: 'toggle_on', blurb: 'On/off buttons that change shape and color when checked.' },
  { slug: 'button-groups', title: 'Button groups', icon: 'view_week', blurb: 'Connected single-select groups and standard groups with overflow.' },
  { slug: 'split-button', title: 'Split button', icon: 'splitscreen_right', blurb: 'A main action plus a menu of related actions.' },
  { slug: 'icon-buttons', title: 'Icon buttons', icon: 'favorite', blurb: 'Shape morph on press and toggle, five container sizes.' },
  { slug: 'fab-menu', title: 'FAB and FAB menu', icon: 'add_circle', blurb: 'Medium FAB and the menu that replaces the speed dial.' },
  { slug: 'floating-toolbar', title: 'Floating toolbar', icon: 'toolbar', blurb: 'The bottom-bar replacement that hides on scroll.' },
  { slug: 'flexible-top-app-bar', title: 'Flexible top app bar', icon: 'web_asset', blurb: 'Medium and large app bars with a subtitle slot.' },
  { slug: 'navigation', title: 'Navigation bar and rail', icon: 'bottom_navigation', blurb: 'ShortNavigationBar for phones, WideNavigationRail for tablets.' },
  { slug: 'segmented-list', title: 'Segmented list', icon: 'view_agenda', blurb: 'Grouped, rounded list items for settings screens.' },
  { slug: 'progress-and-loading', title: 'Progress and loading', icon: 'progress_activity', blurb: 'Wavy progress indicators and the shape-morphing LoadingIndicator.' },
  { slug: 'search', title: 'Search', icon: 'search', blurb: 'The state-based SearchBar that replaces the deprecated one.' },
] as const;
