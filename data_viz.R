#!/usr/bin/env Rscript

library('ggplot2')

args <- commandArgs(trailingOnly=T)

if (length(args)==0) {
  stop("At least one argument must be supplied (input file).csv", call.=FALSE)
    # utm_data  <- read.csv("utm_stripping_data.csv")
} 
utm_data <- read.csv(args[1])


## barplot
ggplot(utm_data, aes(x=reorder(hostname, -number.of.times.stripped), number.of.times.stripped, fill=hostname)) +
    labs(x="Domain Name", y="Number of times stripped", title="Number of times each domain has been stripped of UTM parameters") +
    geom_col() +
    scale_y_continuous(breaks = scales::breaks_extended(Q = c(1, 5, 2, 4, 3)))

## Piechart
ggplot(utm_data, aes(x="", y=number.of.times.stripped, fill=hostname)) +
    ggtitle("How often have you stripped UTM parameters from different domains?") +
    geom_bar(stat="identity", width=1, color="white") + 
    coord_polar("y", start=0) +
    theme_void()
