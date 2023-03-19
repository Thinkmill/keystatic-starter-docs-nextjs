import { useRouter } from "next/router";
import { Fragment, useEffect } from "react";

import { Button } from "@voussoir/button";
import { menuIcon } from "@voussoir/icon/icons/menuIcon";
import { Icon } from "@voussoir/icon";
import { Box, Divider, Flex } from "@voussoir/layout";
import { useLinkComponent } from "@voussoir/link";
import { css, tokenSchema } from "@voussoir/style";
import { Text } from "@voussoir/typography";

import { HEADER_HEIGHT, SIDEBAR_WIDTH } from "../constants";
import { useSidebarContext } from "./context";
import { NavItems } from "./nav-items";
import { SidebarItem } from "./types";
import { ClientOnly, ThemeSwitcher } from "../theme-switcher";

/** Responsively render sidebar navigation items. */
export const Sidebar = ({ items }: { items: SidebarItem[] }) => {
  // const [headerHeight, setHeaderHeight] = useState(NaN);
  const { events } = useRouter();
  const { sidebarIsOpen, closeSidebar, toggleSidebar } = useSidebarContext();

  useEffect(() => {
    // subscribe to next/router event
    events.on("routeChangeStart", closeSidebar);
    return () => {
      // unsubscribe to event on unmount to prevent memory leak
      events.off("routeChangeStart", closeSidebar);
    };
  }, [closeSidebar, events]);

  return (
    <Fragment>
      <Flex
        // borderEnd={{ tablet: 'muted' }}
        backgroundColor="canvas"
        direction="column"
        height={{ mobile: sidebarIsOpen ? "100%" : undefined, tablet: "100%" }}
        position="fixed"
        width={{ mobile: "100vw", tablet: SIDEBAR_WIDTH }}
        zIndex={1}
      >
        <SidebarHeader
          menuIsOpen={sidebarIsOpen}
          onMenuPress={toggleSidebar}
          // onLayout={rect => setHeaderHeight(rect.height)}
        />

        <Box
          isHidden={{ mobile: !sidebarIsOpen, tablet: false }}
          flex
          backgroundColor="surface"
          borderTopEndRadius={{ tablet: "medium" }}
          overflow="hidden auto"
          paddingBottom="xlarge"
          paddingTop={{ mobile: "large", tablet: "xlarge" }}
          paddingEnd={{ mobile: "large", tablet: "xlarge" }}
        >
          <NavItems items={items} />
        </Box>
      </Flex>
      {/* <Box height={headerHeight} isHidden={{ above: 'mobile' }} /> */}
    </Fragment>
  );
};

// Header
// ----------------------------------------------------------------------------

function SidebarHeader({
  menuIsOpen,
  // onLayout,
  onMenuPress,
}: {
  menuIsOpen: boolean;
  // onLayout: (rect: DOMRect) => void;
  onMenuPress: () => void;
}) {
  const Link = useLinkComponent(null);

  const menuLabel = "Open navigation panel";
  const linkClass = css({
    alignItems: "baseline",
    color: tokenSchema.color.foreground.neutralEmphasis,
    display: "flex",
    fontFamily: tokenSchema.typography.fontFamily.base,
    fontSize: tokenSchema.fontsize.text.medium.size,
    fontWeight: tokenSchema.typography.fontWeight.bold,
    textDecoration: "none",
  });

  return (
    <Box backgroundColor="canvas">
      <Flex
        alignItems="center"
        justifyContent="space-between"
        paddingStart={{ mobile: "large", tablet: "xlarge" }}
        paddingEnd={{ mobile: "large", tablet: "unset" }}
        height={{ mobile: HEADER_HEIGHT, tablet: "unset" }}
        paddingY={{ mobile: 0, tablet: "large" }}
      >
        <Box flex>
          <Link href="/" title="My Project" className={linkClass}>
            <Text visuallyHidden>Home</Text>
            <span aria-hidden>✏️ My Project</span>
          </Link>
        </Box>

        <ClientOnly>
          <ThemeSwitcher />
        </ClientOnly>
        <Box
          title={menuLabel}
          role="presentation"
          isHidden={{ above: "mobile" }}
        >
          <Button
            onPress={onMenuPress}
            prominence="low"
            aria-label={menuLabel}
            aria-pressed={menuIsOpen}
          >
            <Icon src={menuIcon} />
          </Button>
        </Box>
      </Flex>
      <Divider marginX="large" isHidden={{ above: "mobile" }} />
    </Box>
  );
}
