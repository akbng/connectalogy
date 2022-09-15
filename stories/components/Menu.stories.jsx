import Menu from "../../components/Menu";

export default {
  title: "Components/Menu",
  component: Menu,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  parameters: {
    layout: "centered",
  },
};

const Template = (args) => <Menu {...args} />;

export const Primary = Template.bind({});
