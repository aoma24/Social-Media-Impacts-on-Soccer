const unpack = (data, key) => data.map(row => row[key])

//to effectively apply styles if they have common layout. this is not applied to those that need to be adjusted manually
const commonLayout = {
    width: 600,
    height: 350,
    paper_bgcolor: '#f8f8f8', //sets the color of paper where the graph is drawn
    plot_bgcolor: '#f8f8f8', //sets the color of plotting area in-between x and y axes
    margin: {
        l: 60,
        r: 60,
        b: 60,
        t: 60,
    },
};

//Chart 1: Share of fans who prefer to watch sports on social media
Plotly.d3.csv("datasets/sportsfan.csv", preference_data => {
    const age = unpack(preference_data, 'Age');
    const percentage = unpack(preference_data, 'Percentage');

    let data = [
        {
            x: age,
            y: percentage,
            type: 'bar',
            marker: {
                color: '#0174BE',
            }
        }
    ];

    let layout = {
        ...commonLayout,
        margin: {
            r: 20,
            t: 50
        },
        title: 'Share of fans who prefer to watch sports on social media',
        xaxis: {
            automargin: true, //setting axis title position with standoff: https://plotly.com/javascript/axes/
            title: {
                text: 'Age',
                standoff: 10
            }
        },
        yaxis: {
            title: 'Share of respondents'
        }
    };

    Plotly.newPlot('chart_1', data, layout);
});


//Chart 2: Google search trends for "second screen"
Plotly.d3.csv("datasets/secondscreen.csv", trends_data => {
    const months = unpack(trends_data, 'Month');
    const trends = unpack(trends_data, 'TrendValue');

    let data = [
        {
            type: 'scatter',
            mode: 'lines',
            x: months,
            y: trends,
            line: { color: '#0174BE' }
        }
    ];

    let layout = {
        ...commonLayout,
        title: 'Google Search Trends for "Second Screen"',
        xaxis: {
            title: 'Year'
        },
        yaxis: {
            title: 'Trend Value'
        }
    };

    Plotly.newPlot('chart_2', data, layout);
});


//Chart 3: Tweets about morocco during world cup
Plotly.d3.csv("datasets/morocco.csv", morocco_data => {
    const dates = unpack(morocco_data, 'Date');
    const neutral = unpack(morocco_data, 'Neutral');
    const positive = unpack(morocco_data, 'Positive');
    const negative = unpack(morocco_data, 'Negative');

    const traceNeutral = {
        type: 'scatter',
        mode: 'lines',
        name: 'Neutral',
        x: dates,
        y: neutral,
        line: { color: '#888888' }
    };

    const tracePositive = {
        type: 'scatter',
        mode: 'lines',
        name: 'Positive',
        x: dates,
        y: positive,
        line: { color: '#FFC436' }
    };

    const traceNegative = {
        type: 'scatter',
        mode: 'lines',
        name: 'Negative',
        x: dates,
        y: negative,
        line: { color: '#0174BE' }
    };

    const data = [traceNeutral, tracePositive, traceNegative];

    let layout = {
        ...commonLayout,
        margin: {
            l: 70,
            r: 100,
            b: 100,
            t: 70
        },
        title: 'Frequency of Tweets about "Morocco" during World Cup',
        xaxis: {
            title: {
                text: 'Date',
                standoff: 20
            },
            
            tickformat: '%b %d', // Format the date with only month and date
            tickvals: dates,
            automargin: true,
        },
        yaxis: {
            title: 'Number of Tweets',
            automargin: true,
        }
    };

    Plotly.newPlot('chart_3', data, layout);
});

//Chart 4: Social media followers before and after Messi's transfer
Plotly.d3.csv("datasets/messi.csv", messi_data => {
    const platforms = unpack(messi_data, 'Platform');
    const before = unpack(messi_data, 'Before');
    const after = unpack(messi_data, 'After');

    var traceBefore = {
        x: platforms,
        y: before,
        name: 'before announcement',
        type: 'bar',
        marker: {
            color: '#0174BE',
        }
    };

    var traceAfter = {
        x: platforms,
        y: after,
        name: 'after announcement',
        type: 'bar',
        marker: {
            color: '#0C356A',
        }
    };

    var data = [traceBefore, traceAfter]; //make it array to make a group bar chart

    var layout = {
        ...commonLayout,
        title: "Social Media Followers Before and After Messi's Transfer",
        barmode: 'group',
        xaxis: {
            title: 'Platform'
        },
        yaxis: {
            title: 'Number of Followers (in millions)'
        }
    };

    Plotly.newPlot('chart_4', data, layout);
});


//Chart 5: Average weekly instagram posts in different industries
Plotly.d3.csv("datasets/instapost.csv", instapost_data => {
    const industry = unpack(instapost_data, 'Industry');
    const weeklypost = unpack(instapost_data, 'Average posts');

    // Giving 'sports teams' a different color from others
    const colors = industry.map(ind => ind === 'sports teams' ? '#FFC436' : '#0174BE');

    const data = [
        {
            x: weeklypost,
            y: industry,
            type: 'bar',
            orientation: 'h',
            marker: {
                color: colors
            }
        }
    ];

    const layout = {
        width: 800,
        height: 350,
        paper_bgcolor: '#f8f8f8',
        plot_bgcolor: '#f8f8f8',
        margin: {
            l: 160,
            r: 5,
            b: 60,
            t: 60,
        },
        title: "Average Weekly Instagram Posts in Different Industries",
        xaxis: {
            title: 'Number of Instagram Posts per Week'
        },
        yaxis: {
            title: {
                text: 'Brands Industry',
                standoff: 20,
            }
        }
    };

    Plotly.newPlot('chart_5', data, layout);
});


//Chart 6: Share of respondents answer the importance of social media in club's brand value
Plotly.d3.csv("datasets/brandvalue.csv", brandvalue_data => {
    const leagueName = unpack(brandvalue_data, 'League name');
    const low = unpack(brandvalue_data, 'Low');
    const medium = unpack(brandvalue_data, 'Medium');
    const high = unpack(brandvalue_data, 'High');

    var traceLow = {
        x: leagueName,
        y: low,
        name: 'Low importance',
        type: 'bar',
        marker: {
            color: 'FFC436'
        }
    };

    var traceMid = {
        x: leagueName,
        y: medium,
        name: 'Medium importance',
        type: 'bar',
        marker: {
            color: '0174BE'
        }
    };

    var traceHigh = {
        x: leagueName,
        y: high,
        name: 'High importance',
        type: 'bar', 
        marker: {
            color: '0C356A'
        }
    };

    var data = [traceHigh, traceMid, traceLow]; //stacking in order from high to low

    var layout = {
        ...commonLayout,
        title: "Importance of social media for club's brand value",
        barmode: 'stack',
        
        xaxis: {
            automargin: true,
            title: {
                text: 'Different soccer leagues',
                standoff: 20
            }
        },
        yaxis: {
            title: 'Share of respondents'
        }
    };

    Plotly.newPlot('chart_6', data, layout);
});


//Chart 7 - two charts
// Function to update the chart based on the selected chart type to switch between two charts
function updateChart() {
    const chartType = document.getElementById("chartType").value;

    if (chartType === "choropleth") {
        renderPenetrationData();
    } else if (chartType === "line") {
        renderRevenueData();
    }
}

// Function to render the choropleth map
function renderPenetrationData() {
    Plotly.d3.csv("datasets/penetration.csv", penetration_data => {
        let years = ['2017', '2018', '2019', '2020', '2021', '2022', '2023', '2024', '2025', '2026', '2027', '2028', '2029'];

        const location = unpack(penetration_data, 'Code');
        const country = unpack(penetration_data, 'Country');

        // Calculate the global minimum and maximum values across all years (ChatGPT used)
        // This ensures the colorbar to remain consistent across all frames, reflecting the same value range regardless of the year being displayed
        const allValues = years.map(year => unpack(penetration_data, year)).flat();
        const globalMin = Math.min(...allValues);
        const globalMax = Math.max(...allValues);

        let data = [{
            type: 'choropleth',
            locations: location,
            z: unpack(penetration_data, '2017'),
            text: country,
            colorscale: [ //5 class YIGnBu color palette copied from: https://colorbrewer2.org/#type=sequential&scheme=YlGnBu&n=5
                [0.0, '#ffffcc'], // First color
                [0.1, '#a1dab4'], // Second color
                [0.3, '#41b6c4'], // Third color
                [0.5, '#2c7fb8'], // Fourth color
                [1.0, '#253494'] // Fifth color
            ],
            colorbar: {
                ticksuffix: '%',
                title: 'User Penetration (%)',
                titlefont: {
                    size: 10,
                    family: '',
                    color: '#000000'
                }
            },
            zmin: globalMin,
            zmax: globalMax
        }];

        let frames = years.map(year => ({
            name: year,
            data: [{
                z: unpack(penetration_data, year),
                zmin: globalMin,
                zmax: globalMax
            }]
        }));

        let layout = {
            title: 'Global Comparison of User Penetration in Soccer Media(2017-2029)',
            width: 900,
            height: 400,
            paper_bgcolor: '#f8f8f8',
            plot_bgcolor: '#f8f8f8',
            margin: {
                l: 5,
                r: 5,
                b: 100,
                t: 70
            },
            geo: {
                showframe: false,
                projection: {
                    type: 'robinson' //to be able to see wide range(more countries at once)
                },
                bgcolor: '#f8f8f8',
                showland: true,
                landcolor: 'white',
                domain: { //make the map occupy the full width and height of the plot area
                    x: [0, 1],
                    y: [0, 1]
                }
            },
            sliders: [{
                steps: years.map(year => ({
                    label: year,
                    method: 'animate',
                    args: [[year], {
                        mode: 'immediate',
                        transition: { duration: 0 }
                    }],
                })),
                active: 0,
                transition: { duration: 0 },
                x: 0.3,
                y: 0.05,
                len: 0.5,
                currentvalue: {
                    visible: true,
                    prefix: 'Current Year: ',
                    xanchor: 'center',
                    font: {
                        size: 13,
                        color: '#000000'
                    }
                }
            }],
            //setting up button for 'Play' and 'Pause'
            updatemenus: [{
                type: 'buttons',
                showactive: false,
                x: 0.3,
                y: 0.1,
                xanchor: 'right',
                yanchor: 'top',
                direction: 'left',
                pad: { t: 60, r: 20 },
                buttons: [{
                    label: 'Play',
                    method: 'animate',
                    args: [null, {
                        frame: { duration: 300, redraw: true },
                        fromcurrent: true,
                        mode: 'immediate',
                        transition: { duration: 0 }
                    }]
                }, {
                    label: 'Pause',
                    method: 'animate',
                    args: [[null], {
                        frame: { duration: 0, redraw: true },
                        mode: 'immediate',
                        transition: { duration: 0 }
                    }]
                }]
            }]
        };

        Plotly.newPlot("chart_7", data, layout).then(function () {
            Plotly.addFrames('chart_7', frames);
        });
    });
}

// Function to render the line chart
function renderRevenueData() {
    Plotly.d3.csv("datasets/revenue.csv", revenue_data => {
        const years = unpack(revenue_data, 'Year');
        const revenue = unpack(revenue_data, 'Revenue');

        let data = [
            {
                type: 'scatter',
                mode: 'lines+markers',
                x: years,
                y: revenue,
                line: { color: '#0174BE' }
            }
        ];

        let layout = {
            width: 900,
            height: 400,
            margin: {
                r: 10
            },
            paper_bgcolor: '#f8f8f8',
            plot_bgcolor: '#f8f8f8',
            title: 'Revenue Growth of Soccer Media(2017-2029)',
            xaxis: {
                title: 'Year'
            },
            yaxis: {
                title: 'Revenue (in billions)'
            }
        };

        Plotly.newPlot('chart_7', data, layout);
    });
}

// Initialize the chart with the choropleth map
document.addEventListener("DOMContentLoaded", function () {
    renderPenetrationData();
});
