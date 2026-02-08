import { NavLink as RouterNavLink } from "react-router-dom";
import { cn } from "../lib/utils";

const NavLink = ({
  to,
  className = "",
  activeClassName = "",
  pendingClassName = "",
  ...props
}) => {
  return (
    <RouterNavLink
      to={to}
      className={({ isActive, isPending }) =>
        cn(
          className,
          isActive && activeClassName,
          isPending && pendingClassName
        )
      }
      {...props}
    />
  );
};

export { NavLink };
