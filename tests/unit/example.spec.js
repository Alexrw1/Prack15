import { mount } from '@vue/test-utils';
import RestaurantCard from '../../src/components/Restaurants/RestaurantCard.vue';

describe('RestaurantCard', () => {
  it('renders correctly with props', () => {
    // Arrange
    const propsData = {
      to: { path: '/example' },
      src: 'path/to/image.jpg',
      name: 'Product Name',
      label: 'New',
    };

    // Act
    const wrapper = mount(RestaurantCard, {
      propsData,
    });

    // Assert
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.props('to')).toEqual(propsData.to);
    expect(wrapper.props('src')).toBe(propsData.src);
    expect(wrapper.props('name')).toBe(propsData.name);
    expect(wrapper.props('label')).toBe(propsData.label);

    // Check if the rendered content is as expected
    expect(wrapper.find('.card__content--title').text()).toBe(propsData.name);
    expect(wrapper.find('.card__content--hashtags').exists()).toBe(true);
    // Add more assertions based on your component structure and content
  });

  it('emits a click event when clicked', async () => {
    // Arrange
    const propsData = {
      to: { path: '/example' },
      src: 'path/to/image.jpg',
      name: 'Product Name',
      label: 'New',
    };

    const wrapper = mount(RestaurantCard, {
      propsData,
    });

    // Act
    await wrapper.trigger('click');

    // Assert
    expect(wrapper.emitted('click')).toBeTruthy();
    expect(wrapper.emitted('click').length).toBe(1);
    expect(wrapper.emitted('click')[0]).toEqual([propsData.to]);
  });

  // Add more test cases as needed
});
