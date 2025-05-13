export const DISABLED_SHADOW_STYLE = {
  elevation: 0,
  shadowOpacity: 0,
  shadowRadius: 0,
  shadowOffset: { height: 0, width: 0 },
};

const shadow = {
  shadow1Bold: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  shadow1: {
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.21,
    shadowRadius: 2.1,
    elevation: 2,
  },
  shadow2: {
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.16,
    shadowRadius: 1.51,
    elevation: 2,
  },
  shadow3: {
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    elevation: 1,
  },
  shadow4: {
    shadowOffset: {
      width: 0,
      height: 0.3,
    },
    shadowOpacity: 0.18,
    shadowRadius: 0.5,
    elevation: 0.3,
  },
} as const;

export default shadow;
