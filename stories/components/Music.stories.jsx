import Music from "../../components/Music.svg.jsx";

export default {
  title: "Components/Music",
  component: Music,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  parameters: {
    layout: "centered",
  },
};

const Template = (args) => <Music {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  size: 150,
  color: "#115e59",
};
