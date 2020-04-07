
const outerBoxShadow = (shadowColor = 'gray', opacity = 1, radius = 3, elevation = 2) => {
    return {
        shadowOffset:{  width: 0,  height: 0  },
        shadowColor: shadowColor,
        shadowOpacity: opacity,
        elevation: elevation,
        shadowRadius: radius,
        overconstrained: 'hidden'
    }
};

const innerBoxShadow = (shadowColor = 'gray', opacity = 1, radius = 3, elevation = 2) => {
    return {
        shadowOffset:{  width: 20,  height: 20  },
        shadowColor: shadowColor,
        shadowOpacity: opacity,
        elevation: elevation,
        shadowRadius: radius,
        overconstrained: 'hidden'
    }
};

const boxShadow = {
    shadowOffset:{  width: 0,  height: 0  },
    shadowColor: 'black',
    shadowOpacity: 0.5,
    elevation: 2,
    shadowRadius: 3,
};

export {
    outerBoxShadow,
    innerBoxShadow,
    boxShadow
}

