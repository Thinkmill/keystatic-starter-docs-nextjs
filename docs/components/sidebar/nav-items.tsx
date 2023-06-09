import { NextRouter, useRouter } from "next/router";

import { bookIcon } from "@voussoir/icon/icons/bookIcon";
import { githubIcon } from "@voussoir/icon/icons/githubIcon";
import { Icon } from "@voussoir/icon";
import { Divider } from "@voussoir/layout";
import { NavGroup, NavItem, NavList } from "@voussoir/nav-list";
import { Text } from "@voussoir/typography";

import { SidebarItem } from "./types";

/** Render nav items and groups of nav items. */
export const NavItems = ({ items }: { items: SidebarItem[] }) => {
  const nextRouter = useRouter();
  return (
    <NavList>
      {recursiveItems(items, nextRouter.asPath)}

      <Divider />
      <NavGroup title="Resources">
        <NavItem href="https://keystatic.thinkmill.com.au/">
          <Icon src={bookIcon} />
          <Text>Keystatic Docs</Text>
        </NavItem>
        <NavItem href="https://github.com/thinkmill/keystatic">
          <Icon src={githubIcon} />
          <Text>Keystatic on GitHub</Text>
        </NavItem>
      </NavGroup>
    </NavList>
  );
};

export const recursiveItems = (
  items: SidebarItem[],
  currentPath: NextRouter["asPath"]
) => {
  return items.map((linkOrGroup) => {
    let key = "";
    if ("children" in linkOrGroup) {
      key += linkOrGroup.name;
      return (
        <NavGroup key={key} title={linkOrGroup.name}>
          {recursiveItems(linkOrGroup.children, currentPath)}
        </NavGroup>
      );
    }

    const current = linkOrGroup.href === currentPath ? "page" : undefined;
    return (
      <NavItem
        key={key + linkOrGroup.name}
        href={linkOrGroup.href}
        aria-current={current}
      >
        {linkOrGroup.name}
      </NavItem>
    );
  });
};
