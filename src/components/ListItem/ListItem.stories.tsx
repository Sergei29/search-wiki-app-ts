import React from "react";
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from "@storybook/react/types-6-0";

import ListItem, { ListItemProps } from "./ListItem";

export default {
  title: "Components/ListItem",
  component: ListItem,
} as Meta;

const Template: Story<ListItemProps> = (args) => <ListItem {...args} />;

export const London = Template.bind({});
London.args = {
  id: "https://en.wikipedia.org/wiki/London_Underground",
  label: "London Underground",
};
