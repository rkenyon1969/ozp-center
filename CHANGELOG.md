## 0.2.0 (2014-11-12)

### Bug Fixes
* **Change log:** OZF-459 Fixing review-edited change log text ([3b2ec852](https://github.com/ozone-development/center-ui/commit/3b2ec8526ba3ff1486bb6a1f1d42e39407c9bfb5))
* **Detailed Listing View (previously Quick View) Admin:**
 * Correcting some mistakes made during merge ([8fdf6ca9](https://github.com/ozone-development/center-ui/commit/8fdf6ca9cf8439dde719bb2dc591c7072232f12f))
 * The admin tab should not be visible by users that are not an admin or owner ([fbe2c8f5](https://github.com/ozone-development/center-ui/commit/fbe2c8f5e33e49009513d3819c36f51311c20b86))
* **Cache:** Refresh config cache after CUD on admin types ([958ce666](https://github.com/ozone-development/center-ui/commit/958ce666fc89804509789623fb9d83ab67d9b350))
* **Category:** Deleting a category is causing a 404 error ([d50da4c7](https://github.com/ozone-development/center-ui/commit/d50da4c74ef7dd5d15d54d4ad850f068658a134d))
* **Change logs do not update when rejecting:** Correcting a typo in the ListingAction.js ([b48b0e56](https://github.com/ozone-development/center-ui/commit/b48b0e56059d431175569a1f5a3f120e8292d580))
* **Load error on main page:** Upgrading tcomb-form library to 0.1.5 ([b76d0ba4](https://github.com/ozone-development/center-ui/commit/b76d0ba48d7994d8de0d6aed4c25e0cab0a42b52))

#### Features

* **Error handling:**
  * Fix typo ([16983f00](https://github.com/ozone-development/center-ui/commit/16983f00875669b84ad37c53166f99210a80bcca))
  * Add help messages for fields ([d7c829b0](https://github.com/ozone-development/center-ui/commit/d7c829b05452e29a95afde80c5c43aa83c3ceb36))
  * Gracefully fallback if fields are not defined ([af6054e6](https://github.com/ozone-development/center-ui/commit/af6054e67d23d5a0b9718b153a871801bd6e029d))
  * Modal doesn't close on save ([d0154302](https://github.com/ozone-development/center-ui/commit/d0154302d3f1bac7a7a87207a9ec38b1c08cf147))
  * Display any AJAX errors thrown to users while managing admin objects ([b457e74f](https://github.com/ozone-development/center-ui/commit/b457e74faa8cb5b39fe308e0c6bd20265c1cf46e))
* **Marketplace Management:**
  * Prevent users from access admin page ([ed06da3f](https://github.com/ozone-development/center-ui/commit/ed06da3fd21fb48bf69e51c3686887d8390a1053))
  * Escape HTML ([e20000a4](https://github.com/ozone-development/center-ui/commit/e20000a4eb102839aaed29a0486ef317c9d1b4dd))
  * Implement CRUD for admin types ([ae311526](https://github.com/ozone-development/center-ui/commit/ae31152610bcc37d372d7e7d4efeb9ceeed7f384))

* **Detailed Listing View (previously Quick View) Admin:**
  * Render correctly when refreshing page with the Detailed Listing View (previously Quick View) open ([aa3b9da3](https://github.com/ozone-development/center-ui/commit/aa3b9da3c2f8a257448bea8b771394179d4b0748))
  * Add admin controls to the Detailed Listing View (previously Quick View) ([8072644c](https://github.com/ozone-development/center-ui/commit/8072644cf57c100121440f2294e05370c9770cf0))
  * Adding CSS for styled checkboxes ([5fc05644](https://github.com/ozone-development/center-ui/commit/5fc05644f56cdd704de8b9e173762c3c3976310f))

* **Stewards:** Filter by ORG_STEWARD role ([973c825c](https://github.com/ozone-development/center-ui/commit/973c825cb052a62b661981d02fa4b41de3e03c87))

##0.1.0 (2014-11-1)

###Bug Fixes

* **Create Edit:** Fixing Create/Edit Form imports on Linux ([c5516b10](https://github.com/ozone-development/center-ui/commit/c5516b10a3badfffbf0a55aa86216ca08fb0797d))
* **Discovery:** Fix store schemas to match the listing representation ([02deb55d](https://github.com/ozone-development/center-ui/commit/02deb55da02c6343a95f43cad2e63efd58b593f2))
* **My Listings:**
  * Feedback edit button vertical centering ([97c70762](https://github.com/ozone-development/center-ui/commit/97c7076282c258609ca373f3e20195805e047072))
  * Fixed My Listings links ([197cfc53](https://github.com/ozone-development/center-ui/commit/197cfc5311154b4fc9e9092d50ab6757ab2c4e9b))
* **Create listing:** Correct page title ([9ba9fef3](https://github.com/ozone-development/center-ui/commit/9ba9fef31b30a6592992c433a83f129474f0ef56))
* **CSS:** When the number of listings does not fill the page a blank area is shown ([82b5e6bb](https://github.com/ozone-development/center-ui/commit/82b5e6bbfd69df9b1608664cac231732a10d3e85))
* **Detailed Listing View (previously Quick View)**
  * Detailed Listing View fails to render correctly when refreshing page with the Detailed View open ([1f242b9e](https://github.com/ozone-development/center-ui/commit/1f242b9e68db1814b6b24f884df302f4e2db176a))
  * Dont reset change log on fetch action ([d55af159](https://github.com/ozone-development/center-ui/commit/d55af159537ec21931004b21c24f1ed04ab81dc8))
  * Fix carousel for screenshots in Detailed Listing View (previously Quick View) ([3ca0b9f2](https://github.com/ozone-development/center-ui/commit/3ca0b9f28bc95409c54c42d0eae9bbc8734be2c4))
* **REST:** Update response parse function to work with HAL ([4f90277e](https://github.com/ozone-development/center-ui/commit/4f90277ee83044f6d6278da5f5c9b3f63f77a963))
* **Routing:** Route to parent path when closing Detailed Listing View (previously Quick View) ([651b00f4](https://github.com/ozone-development/center-ui/commit/651b00f4949966c2d3351bc3f549ffc6c65f94ae))

###Features
* **Delete Confirmation:** Generic DeleteConfirmation and ListingDeleteConfirmation (1e60e5fb)
* **My Listings:**
  * OZF-339 More elegant filter impl ([f35e25b4](https://github.com/ozone-development/center-ui/commit/f35e25b42eea225fc019d25c5c6dd17aee26ba48))
  * OZF-342 View links ([e16c0639](https://github.com/ozone-development/center-ui/commit/e16c0639f777dc7609d1332de96cec1f91b5353c))
  * OZF-342 Fixing menu/filter state interaction ([e048be5a](https://github.com/ozone-development/center-ui/commit/e048be5afbc5cdc10f4a56f0a779fe4b94074a81))
  * OZF-342 approvalStatus-sensitive menu options ([4a73defe](https://github.com/ozone-development/center-ui/commit/4a73defe7c8e7ee491c92c81aa593e09930e9a2d))
  * OZF-332: Fixing My Listings loading ([6c676919](https://github.com/ozone-development/center-ui/commit/6c6769197ec986c989dc6c79cb10655af2bf682f))
  * OZF-341 Using Bootstrap styles for button ([7b084530](https://github.com/ozone-development/center-ui/commit/7b084530e31ca98e0add2b821706f7e7a1a13092))
  * OZF-341 Steward feedback functionality and styles ([c6c1dcac](https://github.com/ozone-development/center-ui/commit/c6c1dcacfc1108d4b9b8f2ecb173d6e6ff7abb4b))
  * Feedback Modal ([02e2655b](https://github.com/ozone-development/center-ui/commit/02e2655bfa880f44417bd7bb04a5e26d9f923664))
  * UX review changes ([4bfc2c3d](https://github.com/ozone-development/center-ui/commit/4bfc2c3d6c6746762f0c9854937d4e5ac847306e))
  * OZF-340 Filter counts ([4cfef3ac](https://github.com/ozone-development/center-ui/commit/4cfef3aca4e20ce50dbc23df20baf3eec0625c6e))
  * OZF-340 Initial My Listings filters ([3b1be052](https://github.com/ozone-development/center-ui/commit/3b1be05216ec0fda93b35ff5c1678de03311612c))
  * Adjusting for long titles ([583d8f15](https://github.com/ozone-development/center-ui/commit/583d8f15005ae68bc97d652167500285f812f375))
  * OZF-339 My Listings list ([c4437d43](https://github.com/ozone-development/center-ui/commit/c4437d43eeab642c2ac72738cb9f0697a13f32ac))
  * Basic My Listings functionality and styling ([11ae49f6](https://github.com/ozone-development/center-ui/commit/11ae49f6c2886f29a6ad7a0d28c2853f3ccecc7c))
  * OZF-339 Fixing JSX syntax error ([85cac7f1](https://github.com/ozone-development/center-ui/commit/85cac7f1a994a5dcd214c5783e58b02f7925bb0b))
  * OZF-339 My Listings Page initial work ([9ea53e5f](https://github.com/ozone-development/center-ui/commit/9ea53e5fd37625fd840b7562d8997f81e1dcf966))
* **Categories:**
  * Disable search for admin objects ([537c2d0f](https://github.com/ozone-development/center-ui/commit/537c2d0f30076023d274de121c817270909d7274))
  * Add management links ([05573ca3](https://github.com/ozone-development/center-ui/commit/05573ca3ec6feba482f23ed6f67f14ec2f738fb8))
  * Implement CRUD for category ([a1725b98](https://github.com/ozone-development/center-ui/commit/a1725b989472653dc12b3ec1c4a67215d05b74b2))
* **Detailed Listing View (previously Quick View)**
  * Implement change log tab ([0a1b308c](https://github.com/ozone-development/center-ui/commit/0a1b308c997afc6410966d6258fe806b5a436601))
  * Use listing data instead of fake data ([f02cda10](https://github.com/ozone-development/center-ui/commit/f02cda106a43e9084d0d53a1b051eded8d20cf3b))
* **Routing:** Redirect to home when logo image is clicked ([429c63e9](https://github.com/ozone-development/center-ui/commit/429c63e9be46b7120d32c5aa57c0d298ac2acb48))
