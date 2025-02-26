/**
 * Internal dependencies
 */
import type { WithInjectedProps, WithoutInjectedProps } from '../../utils/create-higher-order-component';
type InstanceIdProps = {
    instanceId: string | number;
};
/**
 * A Higher Order Component used to provide a unique instance ID by component.
 */
declare const withInstanceId: <C extends WithInjectedProps<C, InstanceIdProps>>(Inner: C) => (props: WithoutInjectedProps<C, InstanceIdProps>) => import("react").JSX.Element;
export default withInstanceId;
//# sourceMappingURL=index.d.ts.map