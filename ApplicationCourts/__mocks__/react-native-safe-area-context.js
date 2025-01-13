export const SafeAreaProvider = ({ children }) => children;
export const SafeAreaView = ({ children }) => children;
export const useSafeAreaInsets = () => ({ top: 0, bottom: 0, left: 0, right: 0 });
export const useSafeAreaFrame = () => ({ x: 0, y: 0, width: 100, height: 100 });
export const initialWindowMetrics = {
  frame: { x: 0, y: 0, width: 100, height: 100 },
  insets: { top: 0, left: 0, right: 0, bottom: 0 },
};
