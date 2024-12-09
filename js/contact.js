// 等待 DOM 加载完成
document.addEventListener('DOMContentLoaded', function() {
    // 创建地图实例
    var map = new AMap.Map('map', {
        zoom: 15,
        center: [116.397428, 39.90923],
        viewMode: '2D',
        resizeEnable: true
    });

    // 添加标记
    var marker = new AMap.Marker({
        position: [116.397428, 39.90923],
        title: '我们在这里'
    });
    map.add(marker);

    // 添加地图控件
    map.addControl(new AMap.Scale());
    map.addControl(new AMap.ToolBar({
        position: 'RB'
    }));

    // 添加地图类型切换控件
    map.addControl(new AMap.MapType({
        defaultType: 0,
        showRoad: true
    }));

    // 确保地图正确渲染
    setTimeout(() => {
        map.resize();
    }, 500);

    // 监听窗口大小变化
    window.addEventListener('resize', () => {
        map.resize();
    });
});