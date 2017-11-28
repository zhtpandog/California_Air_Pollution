 
createBarChart("Riverside.csv");

function createBarChart(dataSource) {
 
      // "avg_county.csv"

    d3.csv(dataSource, function (dataset) {
              var svgh = 800
              var svgw = 1000

              co_check = true
              no2_check = true
              o3_check = true
              so2_check = true

              co_max = d3.max(dataset.filter(function(d) {
                return d.Pollutant === "CO"}), function (d) {
                return d.Sample
              })
              no2_max = d3.max(dataset.filter(function(d) {
                return d.Pollutant === "NO2"}), function (d) {
                return d.Sample
              })
              o3_max = d3.max(dataset.filter(function(d) {
                return d.Pollutant === "Ozone"}), function (d) {
                return d.Sample
              })
              so2_max = d3.max(dataset.filter(function(d) {
                return d.Pollutant === "SO2"}), function (d) {
                return d.Sample
              })

              co_scale = d3.scaleLinear()
                            .domain([0,co_max])
                            .range([0,svgw-150])
              no2_scale = d3.scaleLinear()
                            .domain([0,no2_max])
                            .range([0,svgw-150])
              o3_scale = d3.scaleLinear()
                            .domain([0,o3_max])
                            .range([0,svgw-150])
              so2_scale = d3.scaleLinear()
                            .domain([0,so2_max])
                            .range([0,svgw-150])

              // #section3
              svg = d3.select("#dash_bar")
                      .append("svg")
                      .attr("id", "bar_svg")
                      .attr("width", svgw)
                      .attr("height", svgh)

              svg.selectAll("apple")
                  .data(dataset)
                  .enter()
                  .filter(function(d) {
                    return d.Pollutant === "CO"
                  })
                  .append("text")
                  .text(function (d) {
                    return d.County
                  })
                  .attr("x", 20)
                  .attr("y", function (d,i) {
                    return svgh/14*i +25
                  })
                  .attr("font-weight", "bold")

              svg.selectAll("apple")
                  .data(dataset)
                  .enter()
                  .filter(function (d) {
                    return d.Pollutant === "CO"
                  })
                  .append("rect")
                  .attr("class", "co_bar co_col")
                  .attr("y", function (d,i) {
                    return svgh/14 *i 
                  })
                  .attr("x", 150)
                  .attr("height", svgh/14/4 - 3)
                  .attr("width", function (d) {
                    return o3_scale(d.Sample)
                  })

              svg.selectAll("apple")
                  .data(dataset)
                  .enter()
                  .filter(function (d) {
                    return d.Pollutant === "NO2"
                  })
                  .append("rect")
                  .attr("class", "no2_bar no2_col")
                  .attr("y", function (d,i) {
                    return svgh/14*i + svgh/14/4 - 3
                  })
                  .attr("x", 150)
                  .attr("height", svgh/14/4 - 3)
                  .attr("width", function (d) {
                    return o3_scale(d.Sample)
                  })

              svg.selectAll("apple")
                  .data(dataset)
                  .enter()
                  .filter(function (d) {
                    return d.Pollutant === "Ozone"
                  })
                  .append("rect")
                  .attr("class", "o3_bar o3_col")
                  .attr("y", function (d,i) {
                    return svgh/14*i + svgh/14/2 - 6
                  })
                  .attr("x", 150)
                  .attr("height", svgh/14/4 - 3)
                  .attr("width", function (d) {
                    return o3_scale(d.Sample)
                  })

              svg.selectAll("apple")
                  .data(dataset)
                  .enter()
                  .filter(function (d) {
                    return d.Pollutant === "SO2"
                  })
                  .append("rect")
                  .attr("class", "so2_bar so2_col")
                  .attr("y", function (d,i) {
                    return svgh/14*i + svgh/14/4*3 - 9
                  })
                  .attr("x", 150)
                  .attr("height", svgh/14/4 - 3)
                  .attr("width", function (d) {
                    return o3_scale(d.Sample)
                  })

              d3.select("#co_on")
                  .on("click", function (d) {
                    co_check = false

                    d3.selectAll("#co_on")
                      .attr("height", 0)

                    d3.selectAll("#co_off")
                      .attr("height", 20) 

                    d3.selectAll(".co_bar")
                      .transition()
                      .duration(1000)
                      .attr("height", 0)

                    if(no2_check + o3_check + so2_check == 3) {
                      d3.selectAll(".no2_bar")
                        .transition()
                        .duration(1000)
                        .attr("height", svgh/14/3-4)
                        .attr("y", function (d,i) {
                          return svgh/14*i
                        })
                        .attr("width", function (d) {
                          return o3_scale(d.Sample)
                        })

                      d3.selectAll(".o3_bar")
                        .transition()
                        .duration(1000)
                        .attr("height", svgh/14/3-4)
                        .attr("y", function (d,i) {
                          return svgh/14*i + (svgh/14/3 - 4)*1
                        })
                        .attr("width", function (d) {
                          return o3_scale(d.Sample)
                        })

                      d3.selectAll(".so2_bar")
                        .transition()
                        .duration(1000)
                        .attr("height", svgh/14/3-4)
                        .attr("y", function (d,i) {
                          return svgh/14*i + (svgh/14/3 - 4)*2
                        })
                        .attr("width", function (d) {
                          return o3_scale(d.Sample)
                        })
                      }

                    if(no2_check + o3_check + so2_check == 2) {
                      if (no2_check ==  0) {
                        d3.selectAll(".o3_bar")
                          .transition()
                          .duration(1000)
                          .attr("height", svgh/14/2-7)
                          .attr("y", function (d,i) {
                            return svgh/14*i 
                          })
                          .attr("width", function (d) {
                            return o3_scale(d.Sample)
                          })

                        d3.selectAll(".so2_bar")
                          .transition()
                          .duration(1000)
                          .attr("height", svgh/14/2-7)
                          .attr("y", function (d,i) {
                            return svgh/14*i + (svgh/14/2 - 7)
                          })
                          .attr("width", function (d) {
                            return o3_scale(d.Sample)
                          })
                        } else {
                          if (o3_check == 0) {
                            d3.selectAll(".no2_bar")
                              .transition()
                              .duration(1000)
                              .attr("height", svgh/14/2-7)
                              .attr("y", function (d,i) {
                                return svgh/14*i
                              })
                              .attr("width", function (d) {
                                return no2_scale(d.Sample)
                              })

                            d3.selectAll(".so2_bar")
                              .transition()
                              .duration(1000)
                              .attr("height", svgh/14/2-7)
                              .attr("y", function (d,i) {
                                return svgh/14*i + (svgh/14/2 - 7)
                              })
                              .attr("width", function (d) {
                                return no2_scale(d.Sample)
                              }) 
                            } else {
                              d3.selectAll(".no2_bar")
                                .transition()
                                .duration(1000)
                                .attr("height", svgh/14/2-7)
                                .attr("y", function (d,i) {
                                  return svgh/14*i
                                })
                                .attr("width", function (d) {
                                  return o3_scale(d.Sample)
                                })

                              d3.selectAll(".o3_bar")
                                .transition()
                                .duration(1000)
                                .attr("height", svgh/14/2-7)
                                .attr("y", function (d,i) {
                                  return svgh/14*i + (svgh/14/2 - 7)
                                })
                                .attr("width", function (d) {
                                  return o3_scale(d.Sample)
                                })
                            }
                        }
                      }

                      if(no2_check + o3_check + so2_check == 1) {
                        if (no2_check ==  1) {
                          d3.selectAll(".no2_bar")
                            .transition()
                            .duration(1000)
                            .attr("height", svgh/14/1-12)
                            .attr("y", function (d,i) {
                              return svgh/14*i
                            })
                            .attr("width", function (d) {
                                return no2_scale(d.Sample)
                            })
                          } else {
                            if (o3_check == 1) {
                              d3.selectAll(".o3_bar")
                                .transition()
                                .duration(1000)
                                .attr("height", svgh/14/1-12)
                                .attr("y", function (d,i) {
                                  return svgh/14*i 
                                })
                                .attr("width", function (d) {
                                  return o3_scale(d.Sample)
                                })
                              } else {
                                d3.selectAll(".so2_bar")
                                  .transition()
                                  .duration(1000)
                                  .attr("height", svgh/14/1-12)
                                  .attr("y", function (d,i) {
                                    return svgh/14*i
                                  })
                                  .attr("width", function (d) {
                                    return so2_scale(d.Sample)
                                  })
                              }
                          }
                        }
                  })

              d3.select("#co_off")
                  .on("click", function (d) {
                    co_check = true

                    d3.selectAll("#co_off")
                      .attr("height", 0)

                    d3.selectAll("#co_on")
                      .attr("height", 20) 

                    if(no2_check + o3_check + so2_check == 3) {
                      d3.selectAll(".co_bar")
                        .transition()
                        .duration(1000)
                        .attr("height", svgh/14/4-3)
                        .attr("y", function (d,i) {
                          return svgh/14*i
                        })
                        .attr("width", function (d) {
                          return o3_scale(d.Sample)
                        })

                      d3.selectAll(".no2_bar")
                        .transition()
                        .duration(1000)
                        .attr("height", svgh/14/4-3)
                        .attr("y", function (d,i) {
                          return svgh/14*i + (svgh/14/4 - 3)
                        })
                        .attr("width", function (d) {
                          return o3_scale(d.Sample)
                        })

                      d3.selectAll(".o3_bar")
                        .transition()
                        .duration(1000)
                        .attr("height", svgh/14/4-3)
                        .attr("y", function (d,i) {
                          return svgh/14*i + (svgh/14/4 - 3)*2
                        })
                        .attr("width", function (d) {
                          return o3_scale(d.Sample)
                        })

                      d3.selectAll(".so2_bar")
                        .transition()
                        .duration(1000)
                        .attr("height", svgh/14/4-3)
                        .attr("y", function (d,i) {
                          return svgh/14*i + (svgh/14/4 - 3)*3
                        })
                        .attr("width", function (d) {
                          return o3_scale(d.Sample)
                        })
                    }

                    if(no2_check + o3_check + so2_check == 2) {
                      if (no2_check ==  0) {
                        d3.selectAll(".co_bar")
                          .transition()
                          .duration(1000)
                          .attr("height", svgh/14/3-4)
                          .attr("y", function (d,i) {
                            return svgh/14*i
                          })
                          .attr("width", function (d) {
                            return o3_scale(d.Sample)
                          })

                        d3.selectAll(".o3_bar")
                          .transition()
                          .duration(1000)
                          .attr("height", svgh/14/3-4)
                          .attr("y", function (d,i) {
                            return svgh/14*i + (svgh/14/3 - 4)*1
                          })
                          .attr("width", function (d) {
                            return o3_scale(d.Sample)
                          })

                        d3.selectAll(".so2_bar")
                          .transition()
                          .duration(1000)
                          .attr("height", svgh/14/3-4)
                          .attr("y", function (d,i) {
                            return svgh/14*i + (svgh/14/3 - 4)*2
                          })
                          .attr("width", function (d) {
                            return o3_scale(d.Sample)
                          })
                        } else {
                          if (o3_check == 0) {
                            d3.selectAll(".co_bar")
                              .transition()
                              .duration(1000)
                              .attr("height", svgh/14/3-4)
                              .attr("y", function (d,i) {
                                return svgh/14*i
                              })
                              .attr("width", function (d) {
                                return no2_scale(d.Sample)
                              })

                            d3.selectAll(".no2_bar")
                              .transition()
                              .duration(1000)
                              .attr("height", svgh/14/3-4)
                              .attr("y", function (d,i) {
                                return svgh/14*i + (svgh/14/3 - 4)*1
                              })
                              .attr("width", function (d) {
                                return no2_scale(d.Sample)
                              })

                            d3.selectAll(".so2_bar")
                              .transition()
                              .duration(1000)
                              .attr("height", svgh/14/3-4)
                              .attr("y", function (d,i) {
                                return svgh/14*i + (svgh/14/3 - 4)*2
                              })
                              .attr("width", function (d) {
                                return no2_scale(d.Sample)
                              })
                            } else {
                              d3.selectAll(".co_bar")
                                .transition()
                                .duration(1000)
                                .attr("height", svgh/14/3-4)
                                .attr("y", function (d,i) {
                                  return svgh/14*i
                                })
                                .attr("width", function (d) {
                                  return o3_scale(d.Sample)
                                })

                              d3.selectAll(".no2_bar")
                                .transition()
                                .duration(1000)
                                .attr("height", svgh/14/3-4)
                                .attr("y", function (d,i) {
                                  return svgh/14*i + (svgh/14/3 - 4)*1
                                })
                                .attr("width", function (d) {
                                  return o3_scale(d.Sample)
                                })

                              d3.selectAll(".o3_bar")
                                .transition()
                                .duration(1000)
                                .attr("height", svgh/14/3-4)
                                .attr("y", function (d,i) {
                                  return svgh/14*i + (svgh/14/3 - 4)*2
                                })
                                .attr("width", function (d) {
                                  return o3_scale(d.Sample)
                                })
                            }
                        }
                      }

                      if(no2_check + o3_check + so2_check == 1) {
                        if (no2_check ==  1) {
                          d3.selectAll(".co_bar")
                            .transition()
                            .duration(1000)
                            .attr("height", svgh/14/2-7)
                            .attr("y", function (d,i) {
                              return svgh/14*i 
                            })
                            .attr("width", function (d) {
                              return no2_scale(d.Sample)
                            })

                          d3.selectAll(".no2_bar")
                            .transition()
                            .duration(1000)
                            .attr("height", svgh/14/2-7)
                            .attr("y", function (d,i) {
                              return svgh/14*i + (svgh/14/2 - 7)
                            }) 
                            .attr("width", function (d) {
                              return no2_scale(d.Sample)
                            })
                          } else {
                            if (o3_check == 1) {
                              d3.selectAll(".co_bar")
                                .transition()
                                .duration(1000)
                                .attr("height", svgh/14/2-7)
                                .attr("y", function (d,i) {
                                  return svgh/14*i 
                                })
                                .attr("width", function (d) {
                                  return o3_scale(d.Sample)
                                })

                              d3.selectAll(".o3_bar")
                                .transition()
                                .duration(1000)
                                .attr("height", svgh/14/2-7)
                                .attr("y", function (d,i) {
                                  return svgh/14*i + (svgh/14/2 - 7)
                                })
                                .attr("width", function (d) {
                                  return o3_scale(d.Sample)
                                })
                              } else {
                                d3.selectAll(".co_bar")
                                  .transition()
                                  .duration(1000)
                                  .attr("height", svgh/14/2-7)
                                  .attr("y", function (d,i) {
                                    return svgh/14*i 
                                  })
                                  .attr("width", function (d) {
                                    return so2_scale(d.Sample)
                                  })

                                d3.selectAll(".so2_bar")
                                  .transition()
                                  .duration(1000)
                                  .attr("height", svgh/14/2-7)
                                  .attr("y", function (d,i) {
                                    return svgh/14*i + (svgh/14/2 - 7)
                                  }) 
                                  .attr("width", function (d) {
                                    return so2_scale(d.Sample)
                                  })
                              }
                          }
                      }

                      if(no2_check + o3_check + so2_check == 0) {
                        d3.selectAll(".co_bar")
                          .transition()
                          .duration(1000)
                          .attr("height", svgh/14/1-12)
                          .attr("y", function (d,i) {
                            return svgh/14*i
                          })
                          .attr("width", function (d) {
                            return co_scale(d.Sample)
                          })
                      }
                  })

              d3.select("#no2_on")
                  .on("click", function (d) {
                    no2_check = false

                    d3.selectAll("#no2_on")
                      .attr("height", 0)

                    d3.selectAll("#no2_off")
                      .attr("height", 20) 

                    d3.selectAll(".no2_bar")
                      .transition()
                      .duration(1000)
                      .attr("height", 0)

                    if(co_check + o3_check + so2_check == 3) {
                      d3.selectAll(".co_bar")
                        .transition()
                        .duration(1000)
                        .attr("height", svgh/14/3-4)
                        .attr("y", function (d,i) {
                          return svgh/14*i
                        })
                        .attr("width", function (d) {
                          return o3_scale(d.Sample)
                        })

                      d3.selectAll(".o3_bar")
                        .transition()
                        .duration(1000)
                        .attr("height", svgh/14/3-4)
                        .attr("y", function (d,i) {
                          return svgh/14*i + (svgh/14/3 - 4)*1
                        })
                        .attr("width", function (d) {
                          return o3_scale(d.Sample)
                        })

                      d3.selectAll(".so2_bar")
                        .transition()
                        .duration(1000)
                        .attr("height", svgh/14/3-4)
                        .attr("y", function (d,i) {
                          return svgh/14*i + (svgh/14/3 - 4)*2
                        })
                        .attr("width", function (d) {
                          return o3_scale(d.Sample)
                        })
                      }

                    if(co_check + o3_check + so2_check == 2) {
                      if (co_check ==  0) {
                        d3.selectAll(".o3_bar")
                          .transition()
                          .duration(1000)
                          .attr("height", svgh/14/2-7)
                          .attr("y", function (d,i) {
                            return svgh/14*i 
                          })
                          .attr("width", function (d) {
                            return o3_scale(d.Sample)
                          })

                        d3.selectAll(".so2_bar")
                          .transition()
                          .duration(1000)
                          .attr("height", svgh/14/2-7)
                          .attr("y", function (d,i) {
                            return svgh/14*i + (svgh/14/2 - 7)
                          })
                          .attr("width", function (d) {
                            return o3_scale(d.Sample)
                          })
                        } else {
                          if (o3_check == 0) {
                            d3.selectAll(".co_bar")
                              .transition()
                              .duration(1000)
                              .attr("height", svgh/14/2-7)
                              .attr("y", function (d,i) {
                                return svgh/14*i
                              })
                              .attr("width", function (d) {
                                return so2_scale(d.Sample)
                              })

                            d3.selectAll(".so2_bar")
                              .transition()
                              .duration(1000)
                              .attr("height", svgh/14/2-7)
                              .attr("y", function (d,i) {
                                return svgh/14*i + (svgh/14/2 - 7)
                              })
                              .attr("width", function (d) {
                                return so2_scale(d.Sample)
                              }) 
                            } else {
                              d3.selectAll(".co_bar")
                                .transition()
                                .duration(1000)
                                .attr("height", svgh/14/2-7)
                                .attr("y", function (d,i) {
                                  return svgh/14*i
                                })
                                .attr("width", function (d) {
                                  return o3_scale(d.Sample)
                                })

                              d3.selectAll(".o3_bar")
                                .transition()
                                .duration(1000)
                                .attr("height", svgh/14/2-7)
                                .attr("y", function (d,i) {
                                  return svgh/14*i + (svgh/14/2 - 7)
                                })
                                .attr("width", function (d) {
                                  return o3_scale(d.Sample)
                                })
                            }
                        }
                      }

                      if(co_check + o3_check + so2_check == 1) {
                        if (co_check ==  1) {
                          d3.selectAll(".co_bar")
                            .transition()
                            .duration(1000)
                            .attr("height", svgh/14/1-12)
                            .attr("y", function (d,i) {
                              return svgh/14*i
                            })
                            .attr("width", function (d) {
                                return co_scale(d.Sample)
                            })
                          } else {
                            if (o3_check == 1) {
                              d3.selectAll(".o3_bar")
                                .transition()
                                .duration(1000)
                                .attr("height", svgh/14/1-12)
                                .attr("y", function (d,i) {
                                  return svgh/14*i 
                                })
                                .attr("width", function (d) {
                                  return o3_scale(d.Sample)
                                })
                              } else {
                                d3.selectAll(".so2_bar")
                                  .transition()
                                  .duration(1000)
                                  .attr("height", svgh/14/1-12)
                                  .attr("y", function (d,i) {
                                    return svgh/14*i
                                  })
                                  .attr("width", function (d) {
                                    return so2_scale(d.Sample)
                                  })
                              }
                          }
                        }
                  })

              d3.select("#no2_off")
                  .on("click", function (d) {
                    no2_check = true

                    d3.selectAll("#no2_off")
                      .attr("height", 0)

                    d3.selectAll("#no2_on")
                      .attr("height", 20) 

                    if(co_check + o3_check + so2_check == 3) {
                      d3.selectAll(".co_bar")
                        .transition()
                        .duration(1000)
                        .attr("height", svgh/14/4-3)
                        .attr("y", function (d,i) {
                          return svgh/14*i
                        })
                        .attr("width", function (d) {
                          return o3_scale(d.Sample)
                        })

                      d3.selectAll(".no2_bar")
                        .transition()
                        .duration(1000)
                        .attr("height", svgh/14/4-3)
                        .attr("y", function (d,i) {
                          return svgh/14*i + (svgh/14/4 - 3)
                        })
                        .attr("width", function (d) {
                          return o3_scale(d.Sample)
                        })

                      d3.selectAll(".o3_bar")
                        .transition()
                        .duration(1000)
                        .attr("height", svgh/14/4-3)
                        .attr("y", function (d,i) {
                          return svgh/14*i + (svgh/14/4 - 3)*2
                        })
                        .attr("width", function (d) {
                          return o3_scale(d.Sample)
                        })

                      d3.selectAll(".so2_bar")
                        .transition()
                        .duration(1000)
                        .attr("height", svgh/14/4-3)
                        .attr("y", function (d,i) {
                          return svgh/14*i + (svgh/14/4 - 3)*3
                        })
                        .attr("width", function (d) {
                          return o3_scale(d.Sample)
                        })
                    }

                    if(co_check + o3_check + so2_check == 2) {
                      if (co_check ==  0) {
                        d3.selectAll(".no2_bar")
                          .transition()
                          .duration(1000)
                          .attr("height", svgh/14/3-4)
                          .attr("y", function (d,i) {
                            return svgh/14*i
                          })
                          .attr("width", function (d) {
                            return o3_scale(d.Sample)
                          })

                        d3.selectAll(".o3_bar")
                          .transition()
                          .duration(1000)
                          .attr("height", svgh/14/3-4)
                          .attr("y", function (d,i) {
                            return svgh/14*i + (svgh/14/3 - 4)*1
                          })
                          .attr("width", function (d) {
                            return o3_scale(d.Sample)
                          })

                        d3.selectAll(".so2_bar")
                          .transition()
                          .duration(1000)
                          .attr("height", svgh/14/3-4)
                          .attr("y", function (d,i) {
                            return svgh/14*i + (svgh/14/3 - 4)*2
                          })
                          .attr("width", function (d) {
                            return o3_scale(d.Sample)
                          })
                        } else {
                          if (o3_check == 0) {
                            d3.selectAll(".co_bar")
                              .transition()
                              .duration(1000)
                              .attr("height", svgh/14/3-4)
                              .attr("y", function (d,i) {
                                return svgh/14*i
                              })
                              .attr("width", function (d) {
                                return no2_scale(d.Sample)
                              })

                            d3.selectAll(".no2_bar")
                              .transition()
                              .duration(1000)
                              .attr("height", svgh/14/3-4)
                              .attr("y", function (d,i) {
                                return svgh/14*i + (svgh/14/3 - 4)*1
                              })
                              .attr("width", function (d) {
                                return no2_scale(d.Sample)
                              })

                            d3.selectAll(".so2_bar")
                              .transition()
                              .duration(1000)
                              .attr("height", svgh/14/3-4)
                              .attr("y", function (d,i) {
                                return svgh/14*i + (svgh/14/3 - 4)*2
                              })
                              .attr("width", function (d) {
                                return no2_scale(d.Sample)
                              })
                            } else {
                              d3.selectAll(".co_bar")
                                .transition()
                                .duration(1000)
                                .attr("height", svgh/14/3-4)
                                .attr("y", function (d,i) {
                                  return svgh/14*i
                                })
                                .attr("width", function (d) {
                                  return o3_scale(d.Sample)
                                })

                              d3.selectAll(".no2_bar")
                                .transition()
                                .duration(1000)
                                .attr("height", svgh/14/3-4)
                                .attr("y", function (d,i) {
                                  return svgh/14*i + (svgh/14/3 - 4)*1
                                })
                                .attr("width", function (d) {
                                  return o3_scale(d.Sample)
                                })

                              d3.selectAll(".o3_bar")
                                .transition()
                                .duration(1000)
                                .attr("height", svgh/14/3-4)
                                .attr("y", function (d,i) {
                                  return svgh/14*i + (svgh/14/3 - 4)*2
                                })
                                .attr("width", function (d) {
                                  return o3_scale(d.Sample)
                                })
                            }
                        }
                      }

                      if(co_check + o3_check + so2_check == 1) {
                        if (co_check ==  1) {
                          d3.selectAll(".co_bar")
                            .transition()
                            .duration(1000)
                            .attr("height", svgh/14/2-7)
                            .attr("y", function (d,i) {
                              return svgh/14*i 
                            })
                            .attr("width", function (d) {
                              return no2_scale(d.Sample)
                            })

                          d3.selectAll(".no2_bar")
                            .transition()
                            .duration(1000)
                            .attr("height", svgh/14/2-7)
                            .attr("y", function (d,i) {
                              return svgh/14*i + (svgh/14/2 - 7)
                            }) 
                            .attr("width", function (d) {
                              return no2_scale(d.Sample)
                            })
                          } else {
                            if (o3_check == 1) {
                              d3.selectAll(".no2_bar")
                                .transition()
                                .duration(1000)
                                .attr("height", svgh/14/2-7)
                                .attr("y", function (d,i) {
                                  return svgh/14*i 
                                })
                                .attr("width", function (d) {
                                  return o3_scale(d.Sample)
                                })

                              d3.selectAll(".o3_bar")
                                .transition()
                                .duration(1000)
                                .attr("height", svgh/14/2-7)
                                .attr("y", function (d,i) {
                                  return svgh/14*i + (svgh/14/2 - 7)
                                })
                                .attr("width", function (d) {
                                  return o3_scale(d.Sample)
                                })
                              } else {
                                d3.selectAll(".no2_bar")
                                  .transition()
                                  .duration(1000)
                                  .attr("height", svgh/14/2-7)
                                  .attr("y", function (d,i) {
                                    return svgh/14*i 
                                  })
                                  .attr("width", function (d) {
                                    return no2_scale(d.Sample)
                                  })

                                d3.selectAll(".so2_bar")
                                  .transition()
                                  .duration(1000)
                                  .attr("height", svgh/14/2-7)
                                  .attr("y", function (d,i) {
                                    return svgh/14*i + (svgh/14/2 - 7)
                                  }) 
                                  .attr("width", function (d) {
                                    return no2_scale(d.Sample)
                                  })
                              }
                          }
                      }

                      if(co_check + o3_check + so2_check == 0) {
                        d3.selectAll(".no2_bar")
                          .transition()
                          .duration(1000)
                          .attr("height", svgh/14/1-12)
                          .attr("y", function (d,i) {
                            return svgh/14*i
                          })
                          .attr("width", function (d) {
                            return no2_scale(d.Sample)
                          })
                      }
                  })

              d3.select("#o3_on")
                  .on("click", function (d) {
                    o3_check = false

                    d3.selectAll("#o3_on")
                      .attr("height", 0)

                    d3.selectAll("#o3_off")
                      .attr("height", 20) 

                    d3.selectAll(".o3_bar")
                      .transition()
                      .duration(1000)
                      .attr("height", 0)

                    if(co_check + no2_check + so2_check == 3) {
                      d3.selectAll(".co_bar")
                        .transition()
                        .duration(1000)
                        .attr("height", svgh/14/3-4)
                        .attr("y", function (d,i) {
                          return svgh/14*i
                        })
                        .attr("width", function (d) {
                          return no2_scale(d.Sample)
                        })

                      d3.selectAll(".no2_bar")
                        .transition()
                        .duration(1000)
                        .attr("height", svgh/14/3-4)
                        .attr("y", function (d,i) {
                          return svgh/14*i + (svgh/14/3 - 4)*1
                        })
                        .attr("width", function (d) {
                          return no2_scale(d.Sample)
                        })


                      d3.selectAll(".so2_bar")
                        .transition()
                        .duration(1000)
                        .attr("height", svgh/14/3-4)
                        .attr("y", function (d,i) {
                          return svgh/14*i + (svgh/14/3 - 4)*2
                        })
                        .attr("width", function (d) {
                          return no2_scale(d.Sample)
                        })

                      }

                    if(co_check + no2_check + so2_check == 2) {
                      if (co_check ==  0) {
                        d3.selectAll(".no2_bar")
                          .transition()
                          .duration(1000)
                          .attr("height", svgh/14/2-7)
                          .attr("y", function (d,i) {
                            return svgh/14*i 
                          })
                          .attr("width", function (d) {
                            return no2_scale(d.Sample)
                          })

                        d3.selectAll(".so2_bar")
                          .transition()
                          .duration(1000)
                          .attr("height", svgh/14/2-7)
                          .attr("y", function (d,i) {
                            return svgh/14*i + (svgh/14/2 - 7)
                          }) 
                          .attr("width", function (d) {
                            return no2_scale(d.Sample)
                          })
                        } else {
                          if (no2_check == 0) {
                            d3.selectAll(".co_bar")
                              .transition()
                              .duration(1000)
                              .attr("height", svgh/14/2-7)
                              .attr("y", function (d,i) {
                                return svgh/14*i
                              })
                              .attr("width", function (d) {
                                return so2_scale(d.Sample)
                              })

                            d3.selectAll(".so2_bar")
                              .transition()
                              .duration(1000)
                              .attr("height", svgh/14/2-7)
                              .attr("y", function (d,i) {
                                return svgh/14*i + (svgh/14/2 - 7)
                              })
                              .attr("width", function (d) {
                                return so2_scale(d.Sample)
                              }) 
                            } else {
                              d3.selectAll(".co_bar")
                                .transition()
                                .duration(1000)
                                .attr("height", svgh/14/2-7)
                                .attr("y", function (d,i) {
                                  return svgh/14*i
                                })
                                .attr("width", function (d) {
                                  return no2_scale(d.Sample)
                                })

                              d3.selectAll(".no2_bar")
                                .transition()
                                .duration(1000)
                                .attr("height", svgh/14/2-7)
                                .attr("y", function (d,i) {
                                  return svgh/14*i + (svgh/14/2 - 7)
                                })
                                .attr("width", function (d) {
                                  return no2_scale(d.Sample)
                                })
                            }
                        }
                      }

                      if(co_check + no2_check + so2_check == 1) {
                        if (co_check ==  1) {
                          d3.selectAll(".co_bar")
                            .transition()
                            .duration(1000)
                            .attr("height", svgh/14/1-12)
                            .attr("y", function (d,i) {
                              return svgh/14*i
                            })
                            .attr("width", function (d) {
                                return co_scale(d.Sample)
                            })
                          } else {
                            if (no2_check == 1) {
                              d3.selectAll(".no2_bar")
                                .transition()
                                .duration(1000)
                                .attr("height", svgh/14/1-12)
                                .attr("y", function (d,i) {
                                  return svgh/14*i 
                                })
                                .attr("width", function (d) {
                                  return no2_scale(d.Sample)
                                })
                              } else {
                                d3.selectAll(".so2_bar")
                                  .transition()
                                  .duration(1000)
                                  .attr("height", svgh/14/1-12)
                                  .attr("y", function (d,i) {
                                    return svgh/14*i
                                  })
                                  .attr("width", function (d) {
                                    return so2_scale(d.Sample)
                                  })
                              }
                          }
                        }
                  })

              d3.select("#o3_off")
                  .on("click", function (d) {
                    o3_check = true

                    d3.selectAll("#o3_off")
                      .attr("height", 0)

                    d3.selectAll("#o3_on")
                      .attr("height", 20) 

                    if(co_check + no2_check + so2_check == 3) {
                      d3.selectAll(".co_bar")
                        .transition()
                        .duration(1000)
                        .attr("height", svgh/14/4-3)
                        .attr("y", function (d,i) {
                          return svgh/14*i
                        })
                        .attr("width", function (d) {
                          return o3_scale(d.Sample)
                        })

                      d3.selectAll(".no2_bar")
                        .transition()
                        .duration(1000)
                        .attr("height", svgh/14/4-3)
                        .attr("y", function (d,i) {
                          return svgh/14*i + (svgh/14/4 - 3)
                        })
                        .attr("width", function (d) {
                          return o3_scale(d.Sample)
                        })

                      d3.selectAll(".o3_bar")
                        .transition()
                        .duration(1000)
                        .attr("height", svgh/14/4-3)
                        .attr("y", function (d,i) {
                          return svgh/14*i + (svgh/14/4 - 3)*2
                        })
                        .attr("width", function (d) {
                          return o3_scale(d.Sample)
                        })

                      d3.selectAll(".so2_bar")
                        .transition()
                        .duration(1000)
                        .attr("height", svgh/14/4-3)
                        .attr("y", function (d,i) {
                          return svgh/14*i + (svgh/14/4 - 3)*3
                        })
                        .attr("width", function (d) {
                          return o3_scale(d.Sample)
                        })
                    }

                    if(co_check + no2_check + so2_check == 2) {
                      if (co_check ==  0) {
                        d3.selectAll(".no2_bar")
                          .transition()
                          .duration(1000)
                          .attr("height", svgh/14/3-4)
                          .attr("y", function (d,i) {
                            return svgh/14*i
                          })
                          .attr("width", function (d) {
                            return o3_scale(d.Sample)
                          })

                        d3.selectAll(".o3_bar")
                          .transition()
                          .duration(1000)
                          .attr("height", svgh/14/3-4)
                          .attr("y", function (d,i) {
                            return svgh/14*i + (svgh/14/3 - 4)*1
                          })
                          .attr("width", function (d) {
                            return o3_scale(d.Sample)
                          })

                        d3.selectAll(".so2_bar")
                          .transition()
                          .duration(1000)
                          .attr("height", svgh/14/3-4)
                          .attr("y", function (d,i) {
                            return svgh/14*i + (svgh/14/3 - 4)*2
                          })
                          .attr("width", function (d) {
                            return o3_scale(d.Sample)
                          }) 
                        } else {
                          if (no2_check == 0) {
                            d3.selectAll(".co_bar")
                              .transition()
                              .duration(1000)
                              .attr("height", svgh/14/3-4)
                              .attr("y", function (d,i) {
                                return svgh/14*i
                              })
                              .attr("width", function (d) {
                                return o3_scale(d.Sample)
                              })

                            d3.selectAll(".o3_bar")
                              .transition()
                              .duration(1000)
                              .attr("height", svgh/14/3-4)
                              .attr("y", function (d,i) {
                                return svgh/14*i + (svgh/14/3 - 4)*1
                              })
                              .attr("width", function (d) {
                                return o3_scale(d.Sample)
                              })

                            d3.selectAll(".so2_bar")
                              .transition()
                              .duration(1000)
                              .attr("height", svgh/14/3-4)
                              .attr("y", function (d,i) {
                                return svgh/14*i + (svgh/14/3 - 4)*2
                              })
                              .attr("width", function (d) {
                                return o3_scale(d.Sample)
                              })
                            } else {
                              d3.selectAll(".co_bar")
                                .transition()
                                .duration(1000)
                                .attr("height", svgh/14/3-4)
                                .attr("y", function (d,i) {
                                  return svgh/14*i
                                })

                              d3.selectAll(".no2_bar")
                                .transition()
                                .duration(1000)
                                .attr("height", svgh/14/3-4)
                                .attr("y", function (d,i) {
                                  return svgh/14*i + (svgh/14/3 - 4)*1
                                })

                              d3.selectAll(".o3_bar")
                                .transition()
                                .duration(1000)
                                .attr("height", svgh/14/3-4)
                                .attr("y", function (d,i) {
                                  return svgh/14*i + (svgh/14/3 - 4)*2
                                })
                            }
                        }
                      }

                      if(co_check + no2_check + so2_check == 1) {
                        if (co_check ==  1) {
                          d3.selectAll(".co_bar")
                            .transition()
                            .duration(1000)
                            .attr("height", svgh/14/2-7)
                            .attr("y", function (d,i) {
                              return svgh/14*i 
                            })
                            .attr("width", function (d) {
                              return o3_scale(d.Sample)
                            })

                          d3.selectAll(".o3_bar")
                            .transition()
                            .duration(1000)
                            .attr("height", svgh/14/2-7)
                            .attr("y", function (d,i) {
                              return svgh/14*i + (svgh/14/2 - 7)
                            }) 
                            .attr("width", function (d) {
                              return o3_scale(d.Sample)
                            })
                          } else {
                            if (no2_check == 1) {
                              d3.selectAll(".no2_bar")
                                .transition()
                                .duration(1000)
                                .attr("height", svgh/14/2-7)
                                .attr("y", function (d,i) {
                                  return svgh/14*i 
                                })
                                .attr("width", function (d) {
                                  return o3_scale(d.Sample)
                                })

                              d3.selectAll(".o3_bar")
                                .transition()
                                .duration(1000)
                                .attr("height", svgh/14/2-7)
                                .attr("y", function (d,i) {
                                  return svgh/14*i + (svgh/14/2 - 7)
                                })
                                .attr("width", function (d) {
                                  return o3_scale(d.Sample)
                                })
                              } else {
                                d3.selectAll(".o3_bar")
                                  .transition()
                                  .duration(1000)
                                  .attr("height", svgh/14/2-7)
                                  .attr("y", function (d,i) {
                                    return svgh/14*i 
                                  })
                                  .attr("width", function (d) {
                                    return o3_scale(d.Sample)
                                  })

                                d3.selectAll(".so2_bar")
                                  .transition()
                                  .duration(1000)
                                  .attr("height", svgh/14/2-7)
                                  .attr("y", function (d,i) {
                                    return svgh/14*i + (svgh/14/2 - 7)
                                  }) 
                                  .attr("width", function (d) {
                                    return o3_scale(d.Sample)
                                  })
                              }
                          }
                      }

                      if(co_check + no2_check + so2_check == 0) {
                        d3.selectAll(".o3_bar")
                          .transition()
                          .duration(1000)
                          .attr("height", svgh/14/1-12)
                          .attr("y", function (d,i) {
                            return svgh/14*i
                          })
                          .attr("width", function (d) {
                            return o3_scale(d.Sample)
                          })
                      }
                  })
              
              d3.select("#so2_on")
                  .on("click", function (d) {
                    so2_check = false

                    d3.selectAll("#so2_on")
                      .attr("height", 0)

                    d3.selectAll("#so2_off")
                      .attr("height", 20) 

                    d3.selectAll(".so2_bar")
                      .transition()
                      .duration(1000)
                      .attr("height", 0)

                    if(co_check + no2_check + o3_check == 3) {
                      d3.selectAll(".co_bar")
                        .transition()
                        .duration(1000)
                        .attr("height", svgh/14/3-4)
                        .attr("y", function (d,i) {
                          return svgh/14*i
                        })
                        .attr("width", function (d) {
                          return o3_scale(d.Sample)
                        })

                      d3.selectAll(".no2_bar")
                        .transition()
                        .duration(1000)
                        .attr("height", svgh/14/3-4)
                        .attr("y", function (d,i) {
                          return svgh/14*i + (svgh/14/3 - 4)*1
                        })
                        .attr("width", function (d) {
                          return o3_scale(d.Sample)
                        })

                      d3.selectAll(".o3_bar")
                        .transition()
                        .duration(1000)
                        .attr("height", svgh/14/3-4)
                        .attr("y", function (d,i) {
                          return svgh/14*i + (svgh/14/3 - 4)*2
                        })
                        .attr("width", function (d) {
                          return o3_scale(d.Sample)
                        })
                      }

                    if(co_check + no2_check + o3_check == 2) {
                      if (co_check ==  0) {
                        d3.selectAll(".no2_bar")
                          .transition()
                          .duration(1000)
                          .attr("height", svgh/14/2-7)
                          .attr("y", function (d,i) {
                            return svgh/14*i 
                          })
                          .attr("width", function (d) {
                            return o3_scale(d.Sample)
                          })

                        d3.selectAll(".o3_bar")
                          .transition()
                          .duration(1000)
                          .attr("height", svgh/14/2-7)
                          .attr("y", function (d,i) {
                            return svgh/14*i + (svgh/14/2 - 7)
                          }) 
                          .attr("width", function (d) {
                            return o3_scale(d.Sample)
                          })
                        } else {
                          if (no2_check == 0) {
                            d3.selectAll(".co_bar")
                              .transition()
                              .duration(1000)
                              .attr("height", svgh/14/2-7)
                              .attr("y", function (d,i) {
                                return svgh/14*i
                              })
                              .attr("width", function (d) {
                                return o3_scale(d.Sample)
                              })

                            d3.selectAll(".o3_bar")
                              .transition()
                              .duration(1000)
                              .attr("height", svgh/14/2-7)
                              .attr("y", function (d,i) {
                                return svgh/14*i + (svgh/14/2 - 7)
                              })
                              .attr("width", function (d) {
                                return o3_scale(d.Sample)
                              }) 
                            } else {
                              d3.selectAll(".co_bar")
                                .transition()
                                .duration(1000)
                                .attr("height", svgh/14/2-7)
                                .attr("y", function (d,i) {
                                  return svgh/14*i
                                })
                                .attr("width", function (d) {
                                  return no2_scale(d.Sample)
                                })

                              d3.selectAll(".no2_bar")
                                .transition()
                                .duration(1000)
                                .attr("height", svgh/14/2-7)
                                .attr("y", function (d,i) {
                                  return svgh/14*i + (svgh/14/2 - 7)
                                })
                                .attr("width", function (d) {
                                  return no2_scale(d.Sample)
                                })
                            }
                        }
                      }

                      if(co_check + no2_check + o3_check == 1) {
                        if (co_check ==  1) {
                          d3.selectAll(".co_bar")
                            .transition()
                            .duration(1000)
                            .attr("height", svgh/14/1-12)
                            .attr("y", function (d,i) {
                              return svgh/14*i
                            })
                            .attr("width", function (d) {
                                return co_scale(d.Sample)
                            })
                          } else {
                            if (no2_check == 1) {
                              d3.selectAll(".no2_bar")
                                .transition()
                                .duration(1000)
                                .attr("height", svgh/14/1-12)
                                .attr("y", function (d,i) {
                                  return svgh/14*i 
                                })
                                .attr("width", function (d) {
                                  return no2_scale(d.Sample)
                                })
                              } else {
                                d3.selectAll(".o3_bar")
                                  .transition()
                                  .duration(1000)
                                  .attr("height", svgh/14/1-12)
                                  .attr("y", function (d,i) {
                                    return svgh/14*i
                                  })
                                  .attr("width", function (d) {
                                    return o3_scale(d.Sample)
                                  })
                              }
                          }
                        }
                  })

              d3.select("#so2_off")
                  .on("click", function (d) {
                    so2_check = true

                    d3.selectAll("#so2_off")
                      .attr("height", 0)

                    d3.selectAll("#so2_on")
                      .attr("height", 20) 

                    if(co_check + no2_check + o3_check == 3) {
                      d3.selectAll(".co_bar")
                        .transition()
                        .duration(1000)
                        .attr("height", svgh/14/4-3)
                        .attr("y", function (d,i) {
                          return svgh/14*i
                        })
                        .attr("width", function (d) {
                          return o3_scale(d.Sample)
                        })

                      d3.selectAll(".no2_bar")
                        .transition()
                        .duration(1000)
                        .attr("height", svgh/14/4-3)
                        .attr("y", function (d,i) {
                          return svgh/14*i + (svgh/14/4 - 3)
                        })
                        .attr("width", function (d) {
                          return o3_scale(d.Sample)
                        })

                      d3.selectAll(".o3_bar")
                        .transition()
                        .duration(1000)
                        .attr("height", svgh/14/4-3)
                        .attr("y", function (d,i) {
                          return svgh/14*i + (svgh/14/4 - 3)*2
                        })
                        .attr("width", function (d) {
                          return o3_scale(d.Sample)
                        })

                      d3.selectAll(".so2_bar")
                        .transition()
                        .duration(1000)
                        .attr("height", svgh/14/4-3)
                        .attr("y", function (d,i) {
                          return svgh/14*i + (svgh/14/4 - 3)*3
                        })
                        .attr("width", function (d) {
                          return o3_scale(d.Sample)
                        })
                    }

                    if(co_check + no2_check + o3_check == 2) {
                      if (co_check ==  0) {
                        d3.selectAll(".no2_bar")
                          .transition()
                          .duration(1000)
                          .attr("height", svgh/14/3-4)
                          .attr("y", function (d,i) {
                            return svgh/14*i
                          })
                          .attr("width", function (d) {
                            return o3_scale(d.Sample)
                          })

                        d3.selectAll(".o3_bar")
                          .transition()
                          .duration(1000)
                          .attr("height", svgh/14/3-4)
                          .attr("y", function (d,i) {
                            return svgh/14*i + (svgh/14/3 - 4)*1
                          })
                          .attr("width", function (d) {
                            return o3_scale(d.Sample)
                          })

                        d3.selectAll(".so2_bar")
                          .transition()
                          .duration(1000)
                          .attr("height", svgh/14/3-4)
                          .attr("y", function (d,i) {
                            return svgh/14*i + (svgh/14/3 - 4)*2
                          })
                          .attr("width", function (d) {
                            return o3_scale(d.Sample)
                          })
                        } else {
                          if (no2_check == 0) {
                            d3.selectAll(".co_bar")
                              .transition()
                              .duration(1000)
                              .attr("height", svgh/14/3-4)
                              .attr("y", function (d,i) {
                                return svgh/14*i
                              })
                              .attr("width", function (d) {
                                return o3_scale(d.Sample)
                              })

                            d3.selectAll(".o3_bar")
                              .transition()
                              .duration(1000)
                              .attr("height", svgh/14/3-4)
                              .attr("y", function (d,i) {
                                return svgh/14*i + (svgh/14/3 - 4)*1
                              })
                              .attr("width", function (d) {
                                return o3_scale(d.Sample)
                              })

                            d3.selectAll(".so2_bar")
                              .transition()
                              .duration(1000)
                              .attr("height", svgh/14/3-4)
                              .attr("y", function (d,i) {
                                return svgh/14*i + (svgh/14/3 - 4)*2
                              })
                              .attr("width", function (d) {
                                return o3_scale(d.Sample)
                              })
                            } else {
                              d3.selectAll(".co_bar")
                                .transition()
                                .duration(1000)
                                .attr("height", svgh/14/3-4)
                                .attr("y", function (d,i) {
                                  return svgh/14*i
                                })
                                .attr("width", function (d) {
                                  return no2_scale(d.Sample)
                                })

                              d3.selectAll(".no2_bar")
                                .transition()
                                .duration(1000)
                                .attr("height", svgh/14/3-4)
                                .attr("y", function (d,i) {
                                  return svgh/14*i + (svgh/14/3 - 4)*1
                                })
                                .attr("width", function (d) {
                                  return no2_scale(d.Sample)
                                })

                              d3.selectAll(".so2_bar")
                                .transition()
                                .duration(1000)
                                .attr("height", svgh/14/3-4)
                                .attr("y", function (d,i) {
                                  return svgh/14*i + (svgh/14/3 - 4)*2
                                })
                                .attr("width", function (d) {
                                  return no2_scale(d.Sample)
                                })
                            }
                        }
                      }

                      if(co_check + no2_check + o3_check == 1) {
                        if (co_check ==  1) {
                          d3.selectAll(".co_bar")
                            .transition()
                            .duration(1000)
                            .attr("height", svgh/14/2-7)
                            .attr("y", function (d,i) {
                              return svgh/14*i 
                            })
                            .attr("width", function (d) {
                              return so2_scale(d.Sample)
                            })

                          d3.selectAll(".so2_bar")
                            .transition()
                            .duration(1000)
                            .attr("height", svgh/14/2-7)
                            .attr("y", function (d,i) {
                              return svgh/14*i + (svgh/14/2 - 7)
                            }) 
                            .attr("width", function (d) {
                              return so2_scale(d.Sample)
                            })
                          } else {
                            if (no2_check == 1) {
                              d3.selectAll(".no2_bar")
                                .transition()
                                .duration(1000)
                                .attr("height", svgh/14/2-7)
                                .attr("y", function (d,i) {
                                  return svgh/14*i 
                                })
                                .attr("width", function (d) {
                                  return no2_scale(d.Sample)
                                })

                              d3.selectAll(".so2_bar")
                                .transition()
                                .duration(1000)
                                .attr("height", svgh/14/2-7)
                                .attr("y", function (d,i) {
                                  return svgh/14*i + (svgh/14/2 - 7)
                                })
                                .attr("width", function (d) {
                                  return no2_scale(d.Sample)
                                })
                              } else {
                                d3.selectAll(".o3_bar")
                                  .transition()
                                  .duration(1000)
                                  .attr("height", svgh/14/2-7)
                                  .attr("y", function (d,i) {
                                    return svgh/14*i 
                                  })
                                  .attr("width", function (d) {
                                    return o3_scale(d.Sample)
                                  })

                                d3.selectAll(".so2_bar")
                                  .transition()
                                  .duration(1000)
                                  .attr("height", svgh/14/2-7)
                                  .attr("y", function (d,i) {
                                    return svgh/14*i + (svgh/14/2 - 7)
                                  }) 
                                  .attr("width", function (d) {
                                    return o3_scale(d.Sample)
                                  })
                              }
                          }
                      }

                      if(co_check + no2_check + o3_check == 0) {
                        d3.selectAll(".so2_bar")
                          .transition()
                          .duration(1000)
                          .attr("height", svgh/14/1-12)
                          .attr("y", function (d,i) {
                            return svgh/14*i
                          })
                          .attr("width", function (d) {
                            return so2_scale(d.Sample)
                          })
                      }
                  })

    /*          sort_co = function () {
                d3.selectAll(".co_bar")
                .sort(function (a,b) {
                  return d3.ascending(a.Sample, b.Sample)
                })
              }

              d3.selectAll("#co_sort")
                .on("click", function () {
                  console.log("apple")
                  sort_co()
                })*/

              d3.selectAll(".co_col")
                .attr("fill", "#af9b60")

              d3.selectAll(".no2_col")
                .attr("fill", "#806517")

              d3.selectAll(".o3_col")
                .attr("fill", "#C38C2B")

              d3.selectAll(".so2_col")
                .attr("fill", "#D5AE7F")
          })
}