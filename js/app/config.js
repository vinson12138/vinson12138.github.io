/**
 * Created by 王成 on 2017-05-26.
 */
define({
    /**
     * 方向定义
     */
    DIR: {
        UP: 0,
        RIGHT: 1,
        DOWN: 2,
        LEFT: 3

    },

    /**
     * 定义各个方向的旋转角�?
     */
    ROTATE:{
        UP: 270,
        RIGHT: 0,
        DOWN: 90,
        LEFT:180
    },
    /**
     *速度定义（其实是每帧动画的间隔ms�?
     */
    SPEED: {
        S: 200,
        N: 100,
        F: 50
    },

    /**
     *定义场地边界
     * 相对坐标，场地为40*30的格�?
     */
    //BOUND: {W: 32, H: 24, D: 25}
	
    BOUND: {W: 25, H: 19, D: 32}

   // BOUND: {W: 25, H: 19, D: 32}

});
