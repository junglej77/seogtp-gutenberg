/**
 * Internal dependencies
 */
import { getCurrentUser } from './get-current-user';
import { loginUser } from './login-user';
import { WP_ADMIN_USER } from './shared/config';

/**
 * Switches the current user to the admin user (if the user
 * running the test is not already the admin user).
 */
export async function switchUserToAdmin() {
  if ((await getCurrentUser()) === WP_ADMIN_USER.username) {
    return;
  }
  await loginUser(WP_ADMIN_USER.username, WP_ADMIN_USER.password);
}
//# sourceMappingURL=switch-user-to-admin.js.map