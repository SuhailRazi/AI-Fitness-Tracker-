// Icon fonts are loaded through expo-asset, which has no asset registry under Jest.
jest.mock('@expo/vector-icons/Ionicons', () => {
  const { View } = jest.requireActual<typeof import('react-native')>('react-native');
  return {
    __esModule: true,
    default: ({ name, ...props }: { name: string }) => <View testID={`icon-${name}`} {...props} />,
  };
});
