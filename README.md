

  
  


# SFFaudio-Search, with Docker-run

  

[comment]: <>  ( Use https://stackedit.io/app# to edit )


  

[SFFaudio-Search](http://192.53.120.71) was a single page Node.js app that was injected into [SFFaudio.com](https://www.sffaudio.com/)'s WordPress search page. It was discontinued because of human intervention needed for manual linking of text posts. It enabled fast and easy searching of SFFaudio's online content of [authors](http://192.53.120.71/?author=larry-niven), [stories](http://192.53.120.71/?book=beyond-lies-the-wub&author=philip-k-dick), [blog-posts](http://192.53.120.71/?book=beyond-lies-the-wub&author=philip-k-dick&view=post_book&choice=4), [PDFs](http://192.53.120.71/?book=beyond-lies-the-wub&author=philip-k-dick&view=pdf&choice=1), and [MP3s](http://192.53.120.71/?book=beyond-lies-the-wub&author=philip-k-dick&view=rsd&choice=1).

  
The data is held in Google Sheets for easy text editing; [PDF data](https://docs.google.com/spreadsheets/d/1sbQ8NR7hvcm4EjSlyhmte0rYtI_G3vnc1o5KLPAW2lc/),
 [RSD data](https://docs.google.com/spreadsheets/d/1VFMgWy6wmTkFIpeNW-NkZdWmpz5iZcuULgMpjn8_QgU/), and 
 [Podcast data](https://docs.google.com/spreadsheets/d/1cWtA1AaY83cBuU_6vt64adDeR-dfT-X1U5VgvCRVMAg/). Then a [Neo4j](https://neo4j.com/) graph database links the data, while [Vis.js](http://visjs.org/) is used to display the interactive relationships. PDFs are displayed via [PDF.js](https://github.com/mozilla/pdf.js) on the canvas. The four small icons in the bottom left and right of the widget

- show help
- resize the graph to window size
- shrink the graph
- grow the graph
  

#### Philip K. Dick's "Beyond Lies the Wub" found after searching for 'dick':

![visual explanation](https://github.com/steenhansen/sffaudio-search/blob/master/beyond-the-wub-book.png)

Four blog posts, a PDF, an RSD, an MP3, a Wikipedia story link, and a link back to the author.

#### After clicking on "RSD # 7" a user can play the associated MP3 while reading along with the PDF:

![visual explanation](https://github.com/steenhansen/sffaudio-search/blob/master/beyond-the-wub-rsd.png)


## Run program locally on Windows


1 Get Docker | [Download](https://hub.docker.com/editions/community/docker-ce-desktop-windows/) Docker Desktop for Windows
| :-- | :-- |
**2 Enter /server-content/** | \$ cd c:/sffaudio-search-docker-run-master/server-content/
**3 Create docker network** | $ docker network create neo4j__nodejs__net
**4 Run Neo4j db container** | &nbsp;
```
  $ docker run ^
    --name=neo4j__container ^
    --env-file=sffaudio_search.env ^
    --network=neo4j__nodejs__net ^
    -p 27474:7474 -p 27687:7687 ^
    --env-file=sffaudio_search.env ^
    -v C:\sffaudio-search-docker-run-master\server-content/neo4j-data/data:/data ^
    -v C:\sffaudio-search-docker-run-master\server-content/neo4j-data/logs:/logs ^
    neo4j:3.4.9
```

5 Run Nodejs container | [Image](https://hub.docker.com/repository/docker/steenhansen/sff-audio-search) on dockerhub
------------ | -------------
``` 
  $ docker run ^
    --name=web__container ^
    --env-file=sffaudio_search.env ^
    --network=neo4j__nodejs__net ^
    -e NEO4J_CONTAINER_NAME=neo4j__container ^
    -p 80:8080  ^
    steenhansen/sff-audio-search:base-nodejs
```

6 View web page | http://localhost:80/
| :-- | :-- |
**7 View Neo4j db page** | http://localhost:27474/browser
&nbsp; | **Connect URL**
&nbsp; |   &nbsp;&nbsp;&nbsp;&nbsp;    bolt://192.53.120.71:27687
&nbsp; | **Username**
&nbsp; |   &nbsp;&nbsp;&nbsp;&nbsp;    neo4j
&nbsp; | **Password**
&nbsp; |   &nbsp;&nbsp;&nbsp;&nbsp;    yer_password





## Caveats
- The Node.js Neo4j-driver used in this project is [1.7.7](https://www.npmjs.com/package/neo4j-driver/v/1.7.7), very old, the current version is 4.2.1 and is not backwards compatible
- The [Neo4j Docker](https://hub.docker.com/_/neo4j) image used in this project is 3.4.9, very old, the current version is 4.2.2 and is not backwards compatible
- Mobile css is not handled correctly anymore as this program's output was meant to be displayed inside of Wordpress pages

## Issues  
- If you get this Docker-Compose message about the neo4j__database/4bdd0d6a0524 container being unhealthy via the node-webserver container, then check that **/server-content/neo4j-data/logs/debug.log** exists and has 777 permissions
  
```
    ERROR: node-webserver Container "4bdd0d6a0524" is unhealthy
```


- If you get the below Neo4j message then delete the **/server-content/neo4j-data/data/dbms/auth** file if it exists and then restart. This occurs when the Neo4j password changes values in secret-passwords.env 

```
    command failed: the provided initial password was not set because
    existing Neo4j users were detected at `/var/lib/neo4j/data/dbms/auth`
```


## Created by


[Steen Hansen](https://github.com/steenhansen)