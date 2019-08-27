## Prerequisites

* Docker and docker-compose

## Running the app

From your terminal/shell/cmd run the command `docker-compose up` (if running the first time run `docker-compose up --build`).

## Prerequisites

* Docker and docker-compose
                
## A MESSAGE TO UNIQUITI NETWORKS

I know this doesn't look too good.
* Hardcoded endpoints and ports to the server and MongoDB
* No tests
* No promises/async/await
* ./server/index.js looks like a mess (no KISS or DRY)
* MongoDB was a quick and dirty integration
* The front-end scales poorly
* Single master git branch (no time for gitflow)

But hey, a week ago I didn't even how to use React at all and this is the first time I use WebSockets,
so that should count for something, right?