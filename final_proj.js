var global_episode = 0;
scrollingElement = (document.scrollingElement || document.body)
var avg_season_IDBM = [];

var pieColors = (function () {
    var colors = [],
        base = '#FFD90F',
        i;

    for (i = 0; i < 10; i += 1) {
        // Start out with a darkened base color (negative brighten), and end
        // up with a much brighter color
        colors.push(Highcharts.color(base).brighten((i - 4) / 7).get());
    }
    return colors;
}());

function scrollToBottom () {
    window.scrollBy(0,300);
 }


Highcharts.getJSON(
    'simpsons_episodes.json',
    function (data) {
        Highcharts.getJSON(
            'csvjson.json',
            function (dataz) {

                let season_list = new Array(26).fill(0.0)
                let avg_ep = 0;
                let ep_arr = new Array(29)
                let name_arr = new Array(29)
                for (i = 0; i < ep_arr.length; i++){
                    ep_arr[i] = []
                    name_arr[i] = []
                }   
                for (i = 0; i < data.length; i++) {
                    season_list[data[i]["season"]] = (season_list[data[i]["season"]] + data[i]["imdb_rating"])/2
                    avg_ep = (avg_ep + data[i]["imdb_rating"])/2
                    ep_arr[data[i]["season"]].push(data[i]["imdb_rating"])
                    name_arr[data[i]["season"]].push([data[i]["title"],data[i]["us_viewers_in_millions"],data[i]["original_air_year"], data[i]["number_in_series"], data[i]["season"]])
                }

                for (i = 0; i < season_list.length; i++){
                    season_list[i] = Math.round(season_list[i]*100)/100
                }
                season_list.splice(-1,1)
                season_list.splice(-1,1)
                season_list.splice(-1,1)

                ep_arr.splice(-1,1)
                ep_arr.splice(-1,1)
                ep_arr.splice(-1,1)
 
                name_arr.splice(-1,1)
                name_arr.splice(-1,1)
                name_arr.splice(-1,1)













                function bar_point_click() {
                            let ep_stuff = new Array(601)
                            for (i = 0; i < ep_stuff.length; i++){
                                ep_stuff[i] = []
                            }  
                            for (i = 0; i < dataz.length; i++){
                                ep_stuff[dataz[i]["episode_id"]].push({"name" : dataz[i]["raw_character_text"],"location" :dataz[i]["raw_location_text"], "words" : dataz[i]["word_count"]})
                            }
                    





                            function on_sub_bar_click(value_id = 1){
                                episode_views = 18
                                szn_num = 1
                                eper_num = 1
                                air_data = "1998"
                                let total_words = 0 ;
                                titlez = ""

                                if(this.x){
                                    value_id = this.x;
                                    value_id = global_episode[value_id][3];
                                    episode_views = global_episode[this.x][1]
                                    szn_num = global_episode[this.x][4];
                                    eper_num = this.x;
                                    air_data = global_episode[this.x][2]
                                    titlez = global_episode[this.x][0]

                                }
                                let temper = ep_stuff[value_id];



                                var distinct = []
                                var flags = [], output = [], l = temper.length, i;
                                for(i=0; i<l; i++) {
                                    if(flags[temper[i].name]) continue;
                                    flags[temper[i].name] = true;
                                    var tot = 0;
                    
                                    for (var j = 0; j<l; j++) {
                                        if(temper[i].name == temper[j].name){
                                            tot = tot + Math.round(temper[j].words)
                                        }
                                    }
                                    if(tot >100){
                                        output.push([temper[i].name,tot]);
                                    }
                                }



                                    for (var t = 0; t < output.length; t){

                                        total_words = total_words + output[t][1]
                                        t = t + 1
                                    }

                                
                                Highcharts.chart('container3', {
                                    chart: {
                                        backgroundColor: "black",
                                        plotBorderWidth: null,
                                        plotShadow: false,
                                        type: 'pie'
                                    },
                                    title: {
                                        text: 'Episode Key Charecters',
                                        style: {
                                            align: 'center',
                                            verticalAlign: 'middle',
                                            color: '#FFD90F',
                                            fontWeight: 'bold',
                                            fontSize: "25px"
                                    },
                                    },
                                    exporting: { enabled: false },
                                    credits: { enabled: false},
                                    plotOptions: {
                                        pie: {
                                            allowPointSelect: true,
                                            cursor: 'pointer',
                                            colors: pieColors,
                                            dataLabels: {
                                                enabled: true
                                            },
                                            showInLegend: false,
                                            dataLabels: {
                                                color: "white",
                                            }
                                        },
                                        backgroundColor: "black",
                                    },
                                    tooltip: {
                                        enabled: true,
                                        distance: 20,
                                        formatter: function() {return "Episode Speaking Time: " + String(Math.round((this.y/total_words)*100)) + "%"}
                                    },
                                    subtitle: {
                                        text: "Season: " + String(szn_num) + 
                                        ",   Episode: "+ String(eper_num) +
                                        ",   Year Aired: " + String(air_data) +
                                        ',   Views in Millions: ' + String(episode_views) ,
                                        style: {
                                            align: 'center',
                                            verticalAlign: 'middle',
                                            color: '#FFD90F',
                                            
                                            fontSize: "12px"
                                    },
                                    },
                                    caption: {
                                        text: "'" + titlez + "'"
                                    },
                                    series:[{
                                        data:output,
                                    }],
                                })
                            }
                            on_sub_bar_click()
                            scrollToBottom()














                    names = name_arr[this.x]
                    hold = ep_arr[this.x]
                    global_episode = names
                    Highcharts.chart('container2', {
                        chart: {
                            type: 'column',
                            backgroundColor: "black",
                        },
                        title: {
                            text: 'Average Episode Rating',
                            style: {
                                    align: 'center',
                                    verticalAlign: 'middle',
                                    color: '#FFD90F',
                                    fontWeight: 'bold',
                                    fontSize: "25px"
                            }
                        },
                        
                        tooltip: {
                            enabled: true,
                            distance: 20,
                            formatter: function () {return names[this.x][0]+ " ("+ String(names[this.x][2]) + ")" + ":  " + String(this.y);}
                        },
                        plotOptions: {
                            column: {
                                pointPadding: -0.2,
                                borderWidth: 0,
                                borderColor: "White",
                                borderWidth: 0,
                                opacity: 0.9,
                                colorByPoint: true,
                                colors: ["#FFD90F", "#fff099"],
                            }
                        },
                        exporting: { enabled: false },
                        credits: {
                            enabled: false
                        },
                        yAxis: {
                            min: 4,
                            max: 10,
            
                            plotLines: [{
                                color: '#FF4E4E',
                                value: Math.round(avg_ep*100)/100,
                                width: 2,
                            }],
            
                            title: {
                                text: "Average IMDB Rating",
                                style: {
                                    color: '#FFD90F',
                                    fontWeight: 'bold',
                                    fontSize: "15px"}
                            },
                            labels :{
                                style: {
                                    color: '#FFD90F',
                                    fontSize: "10px"},
                                step: 0.25,
                            },
                            tickInterval: 1,
                        },
            
                        xAxis: {
                            min: 1,
                            title: {
                                text: "Episode",
                                style: {
                                    color: '#FFD90F',
                                    fontWeight: 'bold',
                                    fontSize: "15px"}
                            },
                            tickInterval: 1,
            
                            labels :{
                                style: {
                                    color: '#FFD90F',
                                    fontSize: "10px"},
                            },
                        },
            
                        legend: {
                            enabled: false
            
                        },
                        series: [{
                            name: "IMDB average episode score",
                            data: hold,
                            point: {
                                events: {
                                    click: on_sub_bar_click
                                }
                            },
                        }]
                    }
                )
                }













                Highcharts.chart('container', {
                    chart: {
                        type: 'column',
                        backgroundColor: "black",
                    },
                    title: {
                        text: 'Average Season Rating',
                        style: {
                                color: '#FFD90F',
                                fontWeight: 'bold',
                                fontSize: "30px"
                        }
                    },
                    caption: {
                        text: '*Red line indicates lifetime mean IMDB rating'
                    },
                    tooltip: {
                        enabled: true,
                        distance: 20,
                        formatter: function () {return this.y;}
                    },
                    plotOptions: {
                        column: {
                            pointPadding: -0.2,
                            borderWidth: 0,
                            borderColor: "White",
                            borderWidth: 0,
                            opacity: 0.9,
                            colorByPoint: true,
                            colors: ["#FFD90F", "#fff099"],
                        }
                    },
                    exporting: { enabled: false },
                    credits: {
                        enabled: false
                    },
                    yAxis: {
                        min: 4,

                        plotLines: [{
                            color: '#FF4E4E',
                            value: Math.round(avg_ep*100)/100,
                            width: 2,
                        }],

                        title: {
                            text: "Average IMDB Rating",
                            style: {
                                color: '#FFD90F',
                                fontWeight: 'bold',
                                fontSize: "15px"}
                        },
                        labels :{
                            style: {
                                color: '#FFD90F',
                                fontSize: "10px"},
                            step: 0.25,
                        },
                        tickInterval: 1,
                    },

                    xAxis: {
                        min: 1,
                        type: "category",
                        catagories: ['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24','25'],

                        title: {
                            text: "Season",
                            style: {
                                color: '#FFD90F',
                                fontWeight: 'bold',
                                fontSize: "15px"}
                        },

                        labels :{
                            style: {
                                color: '#FFD90F',
                                fontSize: "10px"},
                        },
                    },

                    legend: {
                        enabled: false

                    },
                    series: [{
                        name: "IMDB average score",
                        data: season_list,
                        point: {
                            events: {
                                click: bar_point_click
                            }
                        },
                    }]
                })

            }
        )
    }
)












var contains = function(needle) {
    // Per spec, the way to identify NaN is that it is not equal to itself
    var findNaN = needle !== needle;
    var indexOf;

    if(!findNaN && typeof Array.prototype.indexOf === 'function') {
        indexOf = Array.prototype.indexOf;
    } else {
        indexOf = function(needle) {
            var i = -1, index = -1;

            for(i = 0; i < this.length; i++) {
                var item = this[i];

                if((findNaN && item !== item) || item === needle) {
                    index = i;
                    break;
                }
            }

            return index;
        };
    }

    return indexOf.call(this, needle) > -1;
};










//viewership decline
Highcharts.getJSON(
    'simpsons_episodes.json',
    function (data) {
        let viewership = []
        for (var i = 0; i < data.length; i++){
            viewership.push(data[i]["us_viewers_in_millions"])
        }
        Highcharts.chart('container4', {
            chart: {
                zoomType: 'x',
                backgroundColor: "Black"
            },
            title: {
                text: 'Change in Viewership as Episode Count Increases',
                style: {
                    align: 'center',
                    verticalAlign: 'middle',
                    color: '#FFD90F',
                    fontWeight: 'bold',
                    fontSize: "25px"
            },
            },
            subtitle: {
                text: "Select a region to zoom in"
            },
            xAxis: {
                crosshair: true,
                title: {
                    text: 'Episode Count',
                    style: {
                        align: 'center',
                        verticalAlign: 'middle',
                        color: '#FFD90F',
                        fontWeight: 'bold',
                        fontSize: "15px"
                }},
                plotBands: [{
                    color: '#660000', // Color value
                    from: 58, // Start of the plot band
                    to: 60 // End of the plot band
                 },
                 {
                    color: '#660000', // Color value
                    from: 64, // Start of the plot band
                    to: 66 // End of the plot band
                 },
                 {
                    color: '#660000', // Color value
                    from: 233, // Start of the plot band
                    to: 237 // End of the plot band
                 },
                 {
                    color: '#660000', // Color value
                    from: 319, // Start of the plot band
                    to: 321 // End of the plot band
                 }],
                 labels :{
                    style: {
                        color: '#FFD90F',
                        fontSize: "10px"},
                },
            },
            yAxis: {
                max: 35,
                title: {
                    text: 'Viewers in Millions',
                    style: {
                        align: 'center',
                        verticalAlign: 'middle',
                        color: '#FFD90F',
                        fontWeight: 'bold',
                        fontSize: "15px"
                }
                },
                labels :{
                    style: {
                        color: '#FFD90F',
                        fontSize: "10px"},
                },
                
            },
            exporting: { enabled: false },
            credits: {
                enabled: false
            },
            legend: {
                enabled: false
            },
            plotOptions: {
                line:{
                    color: '#FFD90F',
                },
                area: {
                    connectEnds: true,
                    color:'#FFD90F',
                    fillColor: {
                        linearGradient: {
                            x1: 0,
                            y1: 0,
                            x2: 0,
                            y2: 1
                        },
                        stops: [
                            [0, '#FFD90F'],
                            [1, Highcharts.color('#FFD90F').setOpacity(0.4).get('rgba')]
                        ]
                    },
                    marker: {
                        radius: 2
                    },
                    lineWidth: 1,
                    states: {
                        hover: {
                            lineWidth: 1
                        }
                    },
                    threshold: null
                }
            },
            tooltip: {
                distance: 40,
                crosshairs: true,
                formatter: function(){ return "Episode: " + this.x + " Viewership: " + this.y + " Million"},
                positioner: function () {
                    return { x: 890, y: 90 };
                },
            },
            caption: {
                text: "*Red bands represent episodes that were never aired."

            },

            series: [{
                type: 'area',
                name:"",
                data: viewership
            }]
        });


























        avg_season_view = [0,13.4,12.2,12,12.1,10.5,9,8,8.6,9.1,7.9,8.2,14.7,12.4,13.4,10.6,9.6,9.1,8.6,8.0,6.9,7.2,7.3,7.0, 6.3,5.6]

        avg_season_IDBM = [ 0.1456,  0.4856,  0.8056,  1.2056,  0.7656,  1.4256,  0.7856,
        1.3556,  0.2656, -0.0744, -0.2244, -0.2044, -0.4944, -0.3944,
       -0.4644, -0.3544, -0.5444, -0.6544, -0.0144, -0.8844, -0.6544,
       -0.5844, -0.3544, -0.5644, -0.7744]
        avg_season_eeee = [ 3.892,  2.692,  2.492,  2.592,  0.992, -0.508, -1.508, -0.908,
            -0.408, -1.608, -1.308,  5.192,  2.892,  3.892,  1.092,  0.092,
            -0.408, -0.908, -1.508, -2.608, -2.308, -2.208, -2.508, -3.208,
            -3.908]
        Highcharts.chart('container5', {
            chart: {
                backgroundColor: "black",
            },
            title: {
                text: 'Season Average Viewership',
                style: {
                    align: 'center',
                    verticalAlign: 'middle',
                    color: '#FFD90F',
                    fontWeight: 'bold',
                    fontSize: "25px"
            }
            },
            yAxis: {
                min: 5.5,
                
                title: {
                    text: 'Average Viewership in Millions',
                    style: {
                        align: 'center',
                        verticalAlign: 'middle',
                        color: '#FFD90F',
                        fontWeight: 'bold',
                        fontSize: "15px"
                }
                },
                labels: {
                    style: {
                        align: 'center',
                        verticalAlign: 'middle',
                        color: '#FFD90F',
                        fontSize: "10px"
                },
            }
            },
            legend:{
                enabled: false,
            },
            exporting: { enabled: false },
            credits: {
                enabled: false
            },
        
            xAxis: {
                tickInterval: 1,
                min:1,
                title: {
                    text: "Season",
                    style: {
                        align: 'center',
                        verticalAlign: 'middle',
                        color: '#FFD90F',
                        fontWeight: 'bold',
                        fontSize: "15px"
                }
                },
                labels: {
                    style: {
                        align: 'center',
                        verticalAlign: 'middle',
                        color: '#FFD90F',
                        fontSize: "10px"
                },
                },
                plotBands: [{
                    color: '#660000', // Color value
                    from: 11, // Start of the plot band
                    to: 12 // End of the plot band
                 }],
            },
            tooltip: {
                distance: 40,
                crosshairs: true,
                formatter: function(){ return "Season: " + this.x + ", Viewership: " + this.y + " Million"},
            },
            plotOptions: {
                line:{
                    color: '#FFD90F',
                },
            },
            caption: {
                text: "*Red band indicates a transition in how viewing metrics are calculated, from households to individual viewers."
            },
            series: [{
                name:"",
                data: avg_season_view,
            }],
        });







        let eps_final = []

        for (i = 0; i < data.length; i++) {
           eps_final.push([data[i]["number_in_season"],data[i]["season"],data[i]["us_viewers_in_millions"],data[i]["us_viewers_in_millions"]])
        }

        Highcharts.chart('container6', {
            chart: {
                type: 'heatmap',
                plotBorderWidth: 1,
                backgroundColor: "Black",
                marginTop: 110,
                floating:true,
            },
            title: {
                text: "Heat Map of Viewership by Episode",
                style: {
                    align: 'center',
                    verticalAlign: 'middle',
                    color: '#FFD90F',
                    fontWeight: 'bold',
                    fontSize: "25px"
            }
            },
            xAxis: {
                tickInterval:1,
                min:1,
                opposite: true,
                labels: {
                    style: {
                        align: 'center',
                        verticalAlign: 'middle',
                        color: '#FFD90F',
                        fontSize: "10px"
                }},
                title: {
                    text: "Episode",
                    style: {
                        align: 'center',
                        verticalAlign: 'middle',
                        color: '#FFD90F',
                        fontWeight: 'bold',
                        fontSize: "15px"
                }}
            },
            yAxis: {
                tickInterval:1,
                min:1,
                max:25,
                title: null,
                reversed: true,
                labels: {
                    style: {
                        align: 'center',
                        verticalAlign: 'middle',
                        color: '#FFD90F',
                        fontSize: "10px"
                }},
                title: {
                    text: "Season",
                    style: {
                        align: 'center',
                        verticalAlign: 'middle',
                        color: '#FFD90F',
                        fontWeight: 'bold',
                        fontSize: "15px"
                }}
            },
            tooltip: {
                headerFormat: '',
                nullFormat: 'Episode was never aired on TV.',
                },
            exporting: { enabled: false },
            credits: {
                enabled: false
            },
            colorAxis: {
                min: 4.5,
                minColor: '#5472c0',
                maxColor: '#FFD90F'
            },
            caption:{
                text: "*Red squares are for episodes never aired"
            },
            legend: {
                enabled:true,
                title:{
                    text: "Viewership from least to most",
                    style: {
                        align: 'center',
                        verticalAlign: 'middle',
                        color: '#FFD90F',
                        fontWeight: 'bold',
                        fontSize: "10px"
                },
                }
            },
            plotOptions: {
                rowsize: 2,
            },
            series: [{
                data: eps_final,
                nullColor: "#8b0000",
                nullFormat: "N/A"
            }]
        });
})




