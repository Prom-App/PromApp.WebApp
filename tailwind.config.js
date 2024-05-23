module.exports = {
  purge: {
    enabled: false,
    content: [
      './src/**/*.{html,ts}'
    ]
  },
  darkMode: false,
  important: ':root',
  separator: ':',
  theme: {
    screens: {
      xs: '460px',
      sm: '600px',
      smd: '768px',
      md: '960px',
      lg: '1280px',
      xl: '1366px',
      xxl: '1925px',

    },
    colors: {
      current: 'currentColor',
      transparent: 'transparent',

      black: 'var(--text-color)',
      white: 'var(--text-color-light)',
      'contrast-black': 'black',
      'contrast-white': 'white',

      grays: {
        light: '#D6D6D6',
        DEFAULT: '#969CA7',
      },
      gray: {
        light: 'rgba(158, 158, 158, 0.1)',
        DEFAULT: 'rgb(158, 158, 158)',
      },
      red: {
        light: 'rgba(244, 67, 54, 0.1)',
        DEFAULT: 'rgb(244, 67, 54)',
      },
      orange: {
        light: 'rgba(255, 152, 0, 0.1)',
        DEFAULT: 'rgb(255, 152, 0)',
      },
      'deep-orange': {
        light: 'rgba(255, 87, 34, 0.1)',
        DEFAULT: 'rgb(255, 87, 34)',
      },
      amber: {
        light: 'rgba(255, 193, 7, 0.1)',
        DEFAULT: 'rgb(255, 193, 7)',
      },
      green: {
        light: 'rgba(76, 175, 80, 0.1)',
        DEFAULT: 'rgb(76, 175, 80)',
      },
      teal: {
        light: 'rgba(0, 150, 136, 0.1)',
        DEFAULT: 'rgb(0, 150, 136)',
      },
      cyan: {
        light: 'rgba(0, 188, 212, 0.1)',
        DEFAULT: 'rgb(0, 188, 212)',
      },
      purple: {
        light: 'rgba(156, 39, 176, 0.1)',
        DEFAULT: 'rgb(156, 39, 176)',
      },
      'deep-purple': {
        light: 'rgba(103, 58, 183, 0.1)',
        DEFAULT: 'rgb(103, 58, 183)',
      },
      pink: {
        light: 'rgba(233, 30, 99, 0.1)',
        DEFAULT: 'rgb(233, 30, 99)',
      },
      primary: {
        light: 'rgba(var(--color-primary), .1)',
        DEFAULT: 'rgb(var(--color-primary))',
      },
      accent: {
        light: 'rgba(var(--color-accent), .1)',
        DEFAULT: 'rgb(var(--color-accent))',
      },
      warn: {
        light: 'rgba(var(--color-warn), .1)',
        DEFAULT: 'rgb(var(--color-warn))',
      },
      //SMART NEW COLORS PALLETE
      'am-base':{
        background : '#F4F6FF'
      },
      'am-main-blue':{
        DEFAULT: '#7084E3',
        light: '#d0d8ff',
        dark: '#00004d'
      },
      'am-gray':{
        DEFAULT: '#9a9a9a',
        light: '#bebebe',
        dark: '#666666'
      },
      'am-new-green': {
        DEFAULT: '#77dea2',
        light: '#baeed0',
        dark: '#27834d'
      },
      'am-new-orange': {
        DEFAULT: '#f78842',
        light: '#fbc3a0',
        dark: '#af5f2e'
      },
      'am-coral': {
        DEFAULT: '#ee8f72',
        light: '#f6c7b8',
        dark: '#be6a50'
      },
      'am-teal': {
        DEFAULT: '#81e6e2',
        light: '#b3f0ed',
        dark: '#449D99'
      },
      'am-new-red': {
        DEFAULT: '#de7777',
        light: '#f2b0b0',
        dark: '#ac3d3d'
      },
      'am-new-yellow': {
        DEFAULT: '#ffce00',
        light: '#ffeb99',
        dark: '#a56c00'
      },
      'am-new-pink': {
        DEFAULT: '#d977dd',
        light: '#ecbaee',
        dark: '#97569a'
      },
      'am-new-purple': {
        DEFAULT: '#8f7ee3',
        light: '#baacff',
        dark: '#7164b1'
      },

      //SMART COLORS
      'am-purple' :  {
        transparent: '#757de338',
        relight: '#f0f1ff',
        light: '#dbdcff',
        medium: '#927DEA',
        dark: '#465499',
        DEFAULT: '#7084E3'
      },
      'am-green' : {
        light : '#77DEA2',
        brightest : '#77DEA280',
        cyan: '#26b28f',
        dark: '#1f8f4e',
        aqua: '#7DEAB4',
       "brightest-transparent": '#e9f8ee',
       "hover": '#F5FCF7',
        DEFAULT: '#54C931'
        
      },
      'am-red' : {
        alive : '#E56262',
        light: '#ffcece',
        dark: '#d93d3d',
        intense : '#f00846',
        DEFAULT:'#DE7777'
      },
      'am-grey' : {
        light : '#BFC4FF1F',
        dark: '#2C303E',
        'medium' : '#bbbbbb',
        transparent: '#BFC4FF4B',
        DEFAULT: '#666666'
      },
      'am-pink' : {
        light: '#edcff0',
        dark: '#a941ae',
        brightest : '#d977dd3b',
        rose: '#F8BBD0',
        DEFAULT: '#D977DD'
      },
      'am-orange': {
        light : '#f89103',
        relight : '#fff1e8',
        dark: '#b57c00',
        DEFAULT: '#f78842'
      },
      'am-cyan' : {
      light: '#b3edf4',
      dark: '#129aa6',
      blue: '#0061FD60',
      green: '#b9eadf',
      DEFAULT: '#18D9EA',
      },
      'am-blue' : {
        light: '#92C9F2',
        DEFAULT: '#0061FD60',
        dark: '#5784a5',
      },
      'am-yellow': {
        resalt : '#FFCE00',
        light: '#f8e9ae',
        dark: '#c18b11',
        DEFAULT : '#FAD073'
      },
      'am-cream': {
        entry: '#81E6AB',
        entry_light: '#81E6AB33',
        entry_text: '#81E6ABB3',

        lunchgo: '#EEBA72',
        lunchgo_light: '#EEBA7233',
        lunchgo_text: '#EEBA72B3',

        lunchback: '#EE8F72',        
        lunchback_light: '#EE8F7233',
        lunchback_text: '#EE8F72B3',

        exit: '#81E6E2', 
        exit_light: '#81E6E233',
        exit_text: '#81E6E2B3',

        yesterday: '#DE7777', 
        yesterday_light: '#DE777733',
        yesterday_text: '#DE7777B3',
      },
      'am-brown': {
        light: '#f1e1d8',
        dark: '#501D0E',
        DEFAULT: '#A23E00' 
      }
      
    },
    spacing: {
      px: '1px',
      gutter: 'var(--padding-gutter)',
      '0': '0',
      '1': '0.25rem',
      '1.5': '0.375rem',
      '2': '0.5rem',
      '3': '0.75rem',
      '4': '1rem',
      '5': '1.25rem',
      '6': '1.5rem',
      '7': '1.75rem',
      '8': '2rem',
      '9': '2.25rem',
      '10': '2.5rem',
      '11': '2.75rem',
      '12': '3rem',
      '13': '3.25rem',
      '14': '3.5rem',
      '16': '4rem',
      '18': '4.5rem',
      '20': '5rem',
      '21': '5.25rem',
      '22': '5.5rem',
      '24': '6rem',
      '26': '6.5rem',
      '27': '6.75rem',
      '28': '7rem',
      '30': '7.5rem',
      '32': '8rem',
      '36': '9rem',
      '40': '10rem',
      '41': '11.25rem',
      '42': '11.5rem',
      '44': '11rem',
      '48': '12rem',
      '52': '13rem',
      '54': '13.5rem',
      '56': '14rem',
      '60': '15rem',
      '64': '16rem',
      '68': '17rem',
      '72': '18rem',
      '76': '19rem',
      '80': '20rem',
      '84': '21rem',
      '88': '22rem',
      '96': '24rem',
      '112': '28rem',
      '120': '30rem',
      '140': '35rem',
      '150': '37.5rem',
      '160': '40rem',
      '220': '55rem',
      '240': '60rem',
      '300': '75rem',
      '320': '80rem'
    },
    backgroundColor: theme => ({
      base: 'var(--background-base)',
      card: 'var(--background-card)',
      'app-bar': 'var(--background-app-bar)',
      hover: 'var(--background-hover)',
      ...theme('colors'),
    }),
    backgroundPosition: {
      bottom: 'bottom',
      center: 'center',
      left: 'left',
      'left-bottom': 'left bottom',
      'left-top': 'left top',
      right: 'right',
      'right-bottom': 'right bottom',
      'right-top': 'right top',
      top: 'top',
    },
    backgroundSize: {
      auto: 'auto',
      cover: 'cover',
      contain: 'contain',
    },
    borderColor: theme => ({
      ...theme('colors'),
      DEFAULT: 'var(--foreground-divider)',
    }),
    borderRadius: {
      none: '0',
      sm: '0.125rem',
      DEFAULT: '0.25rem',
      lg: '0.5rem',
      xl: '0.75rem',
      '2xl': '1.0rem',
      '3xl': '1.25rem',
      full: '9999px',
    },
    borderWidth: {
      '0': '0',
      '2': '2px',
      '3': '3px',
      '4': '4px',
      '8': '8px',
      DEFAULT: '1px',
    },
    borderStyle:{
      none: 'none',
      solid : 'solid'
    },
    boxShadow: {
      DEFAULT: 'var(--elevation-z6)',
      md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      lg: '0px 7px 8px -4px rgba(82, 63, 104, 0.06),0px 12px 17px 2px rgba(82, 63, 104, 0.042),0px 5px 22px 4px rgba(82, 63, 104, 0.036)',
      xl: '0px 8px 10px -5px rgba(82, 63, 104, 0.06),0px 16px 24px 2px rgba(82, 63, 104, 0.042),0px 6px 30px 5px rgba(82, 63, 104, 0.036)',
      '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
      inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
      outline: '0 0 0 3px rgba(66, 153, 225, 0.5)',
      none: 'none',
      b: '0 10px 30px 0 rgba(82,63,104,.06)',
      1: 'var(--elevation-z1)',
      2: 'var(--elevation-z2)',
      3: 'var(--elevation-z3)',
      4: 'var(--elevation-z4)',
      5: 'var(--elevation-z5)',
      6: 'var(--elevation-z6)',
      7: 'var(--elevation-z7)',
      8: 'var(--elevation-z8)',
      9: 'var(--elevation-z9)',
      10: 'var(--elevation-z10)',
      11: 'var(--elevation-z11)',
      12: 'var(--elevation-z12)',
      13: 'var(--elevation-z13)',
      14: 'var(--elevation-z14)',
      15: 'var(--elevation-z15)',
      16: 'var(--elevation-z16)',
      17: 'var(--elevation-z17)',
      18: 'var(--elevation-z18)',
      19: 'var(--elevation-z19)',
      20: 'var(--elevation-z20)',
    },
    cursor: {
      auto: 'auto',
      DEFAULT: 'default',
      pointer: 'pointer',
      wait: 'wait',
      text: 'text',
      move: 'move',
      'not-allowed': 'not-allowed',
    },
    fill: {
      current: 'currentColor',
    },
    flex: {
      '1': '1 1 0%',
      auto: '1 1 auto',
      initial: '0 1 auto',
      none: 'none',
    },
    flexGrow: {
      '0': '0',
      DEFAULT: '1',
    },
    flexShrink: {
      '0': '0',
      DEFAULT: '1',
    },
    fontFamily: {
      sans: [
        'Inter',
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        '"Noto Sans"',
        'sans-serif',
        '"Apple ColorDef Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
        '"Noto ColorDef Emoji"',
      ],
      serif: [
        'Georgia',
        'Cambria',
        '"Times New Roman"',
        'Times',
        'serif',
      ],
      mono: [
        'Menlo',
        'Monaco',
        'Consolas',
        '"Liberation Mono"',
        '"Courier New"',
        'monospace',
      ],
    },
    fontSize: {
      xxs: '0.625rem',
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.75rem',
      '4xl': '2rem',
      '4-5xl': '2.5rem',
      '5xl': '3rem',
      '6xl': '4rem',
    },
    fontWeight: {
      hairline: '100',
      thin: '200',
      light: '300',
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
      extrabold: '800',
      black: '900',
    },
    height: theme => ({
      auto: 'auto',
      ...theme('spacing'),
      full: '100%',
      screen: '100vh',
      fit: 'fit-content',
    }),
    inset: {
      '0': '0',
      '1': '0.25rem',
      '2': '0.5rem',
      '3': '0.75rem',
      '4': '1rem',
      '5': '1.25rem',
      '6': '1.5rem',
      '8': '2rem',
      '10': '2.5rem',
      '12': '3rem',
      '-1': '-0.25rem',
      '-2': '-0.5rem',
      '-3': '-0.75rem',
      '-4': '-1rem',
      '-5': '-1.25rem',
      '-6': '-1.5rem',
      '-8': '-2rem',
      '-10': '-2.5rem',
      '-12': '-3rem',
      auto: 'auto',
    },
    letterSpacing: {
      tighter: '-0.05em',
      tight: '-0.025em',
      normal: '0',
      wide: '0.025em',
      wider: '0.05em',
      widest: '0.1em',
    },
    lineHeight: {
      none: '1',
      tight: '1.25',
      snug: '1.375',
      normal: '1.5',
      relaxed: '1.625',
      loose: '2',
    },
    listStyleType: {
      none: 'none',
      disc: 'disc',
      decimal: 'decimal',
    },
    margin: (theme, {negative}) => ({
      auto: 'auto',
      ...theme('spacing'),
      ...negative(theme('spacing')),
      ...negative({
        gutter: 'var(--padding-gutter)'
      })
    }),
    maxHeight: theme => ({
      full: '100%',
      screen: '100vh',
      ...theme('spacing')
    }),
    maxWidth: theme => ({
      'screen-80': '80rem',
      'screen-96': '96rem',
      'screen-160': '160rem',
      full: '100%',
      ...theme('spacing')
    }),
    minHeight: theme => ({
      '0': '0',
      full: '100%',
      screen: '100vh',
      ...theme('spacing')
    }),
    minWidth: theme => ({
      '0': '0',
      full: '100%',
      ...theme('spacing')
    }),
    objectPosition: {
      bottom: 'bottom',
      center: 'center',
      left: 'left',
      'left-bottom': 'left bottom',
      'left-top': 'left top',
      right: 'right',
      'right-bottom': 'right bottom',
      'right-top': 'right top',
      top: 'top',
    },
    opacity: {
      '0': '0',
      '25': '0.25',
      '40': '0.4',
      '50': '0.5',
      '75': '0.75',
      '100': '1',
    },
    order: {
      first: '-9999',
      last: '9999',
      none: '0',
      '1': '1',
      '2': '2',
      '3': '3',
      '4': '4',
      '5': '5',
      '6': '6',
      '7': '7',
      '8': '8',
      '9': '9',
      '10': '10',
      '11': '11',
      '12': '12',
    },
    padding: theme => theme('spacing'),
    placeholderColor: theme => theme('colors'),
    stroke: {
      current: 'currentColor',
    },
    textColor: theme => ({
      'secondary': 'var(--text-secondary)',
      'hint': 'var(--text-hint)',
      ...theme('colors'),
      'primary-contrast': 'rgb(var(--color-primary-contrast))',
      'accent-contrast': 'rgb(var(--color-accent-contrast))',
      'warn-contrast': 'rgb(var(--color-warn-contrast))',
      'red-contrast': '#FFF',
      'green-contrast': '#FFF',
      'amber-contrast': '#000',
      'orange-contrast': '#000',
      'deep-orange-contrast': '#FFF',
      'purple-contrast': '#FFF',
      'deep-purple-contrast': '#FFF',
      'cyan-contrast': '#FFF',
      'teal-contrast': '#FFF',
      'gray-contrast': '#FFF',
      'light-green-contrast': '#000',
    }),
    width: theme => ({
      auto: 'auto',
      ...theme('spacing'),
      '1/2': '50%',
      '1/3': '33.333333%',
      '2/3': '66.666667%',
      '1/4': '25%',
      '2/4': '50%',
      '3/4': '75%',
      '1/5': '20%',
      '2/5': '40%',
      '3/5': '60%',
      '4/5': '80%',
      '1/6': '16.666667%',
      '2/6': '33.333333%',
      '3/6': '50%',
      '4/6': '66.666667%',
      '5/6': '83.333333%',
      '1/12': '8.333333%',
      '2/12': '16.666667%',
      '3/12': '25%',
      '4/12': '33.333333%',
      '5/12': '41.666667%',
      '6/12': '50%',
      '7/12': '58.333333%',
      '8/12': '66.666667%',
      '9/12': '75%',
      '10/12': '83.333333%',
      '11/12': '91.666667%',
      full: '100%',
      screen: '100vw',
      fit: 'fit-content',
    }),
    zIndex: {
      auto: 'auto',
      '0': '0',
      '10': '10',
      '20': '20',
      '30': '30',
      '40': '40',
      '50': '50',
    },
  },
  variants: {
    accessibility: ['responsive', 'focus'],
    alignContent: ['responsive'],
    alignItems: ['responsive'],
    alignSelf: ['responsive'],
    appearance: ['responsive'],
    backgroundAttachment: ['responsive'],
    backgroundColor: ['responsive', 'hover', 'focus','disabled'],
    backgroundPosition: ['responsive'],
    backgroundRepeat: ['responsive'],
    backgroundSize: ['responsive'],
    borderCollapse: ['responsive'],
    borderColor: ['responsive', 'hover', 'focus'],
    borderRadius: ['responsive', 'ltr', 'rtl'],
    borderStyle: ['responsive'],
    borderWidth: ['responsive', 'ltr', 'rtl'],
    boxShadow: ['responsive', 'hover', 'focus'],
    cursor: ['responsive','disabled'],
    display: ['responsive'],
    fill: ['responsive'],
    flex: ['responsive'],
    flexDirection: ['responsive'],
    flexGrow: ['responsive'],
    flexShrink: ['responsive'],
    flexWrap: ['responsive'],
    float: ['responsive'],
    fontFamily: ['responsive'],
    fontSize: ['responsive'],
    fontSmoothing: ['responsive'],
    fontStyle: ['responsive'],
    fontWeight: ['responsive', 'hover', 'focus'],
    height: ['responsive'],
    inset: ['responsive', 'ltr', 'rtl'],
    justifyContent: ['responsive'],
    letterSpacing: ['responsive'],
    lineHeight: ['responsive'],
    listStylePosition: ['responsive'],
    listStyleType: ['responsive'],
    margin: ['responsive', 'ltr', 'rtl'],
    maxHeight: ['responsive'],
    maxWidth: ['responsive'],
    minHeight: ['responsive'],
    minWidth: ['responsive'],
    objectFit: ['responsive'],
    objectPosition: ['responsive'],
    opacity: ['responsive', 'hover', 'focus'],
    order: ['responsive'],
    outline: ['responsive', 'focus'],
    overflow: ['responsive'],
    padding: ['responsive', 'ltr', 'rtl'],
    placeholderColor: ['responsive', 'focus'],
    pointerEvents: ['responsive'],
    position: ['responsive'],
    resize: ['responsive'],
    stroke: ['responsive'],
    tableLayout: ['responsive'],
    textAlign: ['responsive'],
    textColor: ['responsive', 'hover', 'focus','disabled'],
    textDecoration: ['responsive', 'hover', 'focus'],
    textTransform: ['responsive'],
    userSelect: ['responsive'],
    verticalAlign: ['responsive'],
    visibility: ['responsive'],
    whitespace: ['responsive'],
    width: ['responsive'],
    wordBreak: ['responsive'],
    zIndex: ['responsive'],
  },
  corePlugins: {
    container: false
  },
  plugins: [
    function ({addVariant, e}) {
      addVariant('ltr', ({separator, modifySelectors}) => {
        modifySelectors(({className}) => {
          return `[dir=ltr] .ltr${e(separator)}${className}`;
        })
      });

      addVariant('rtl', ({separator, modifySelectors}) => {
        modifySelectors(({className}) => {
          return `[dir=rtl] .rtl${e(separator)}${className}`;
        })
      });
    }
  ],
};
