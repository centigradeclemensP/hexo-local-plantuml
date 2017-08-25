# hexo-local-plantuml

This plugin generates the PlantUML images locally rather than using the service at http://www.plantuml.com/plantuml/. 

This is necessary if you are using Hexo for private work and don't want your diagrams bounced off an external server.

## Installation

```bash
$ npm install hexo-local-plantuml --save
```

## Usage

```
{% plantuml %}
@startuml
Bob->Alice : hello
@enduml
{% endplantuml %}
```

Also you can put your definition in a "puml" or "plantuml" code block.

    ```puml
    @startuml
    Class01 <|-- Class02
    @enduml
    ```

## Configuration

You can configure this plugin in `_config.yml`.

```yml
plantuml:
  format: svg            # default is png
  asset_path: plant_uml  # default is puml
  svg_object: true       # use <object> Tag for svg files.
```

## Additional requirements

- [Install Java Runtime Environment.](https://www.java.com/download)
- [Install graphviz package.](http://www.graphviz.org/Download..php)