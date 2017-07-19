// Import React
import React from "react";

// Import Spectacle Core tags
import {
  BlockQuote,
  Cite,
  Deck,
  Code,
  Heading,
  ListItem,
  CodePane,
  List,
  Quote,
  Slide,
  Image,
  Text,
  Link,
  Appear,
  Fit
} from "spectacle";

import Playground from "component-playground";
import CodeSlide from "spectacle-code-slide";

// Import image preloader util
import preloader from "spectacle/lib/utils/preloader";

// Import theme
import createTheme from "spectacle/lib/themes/default";

import MountTodoView from "./todo-view";
import MountTodoAsyncView from "./todo-view-async";


import {
  observable,
  extendObservable,
  autorun
} from "mobx";

import {
  observer
} from "mobx-react";


// Require CSS
require("normalize.css");
require("spectacle/lib/themes/default/index.css");


const images = {
  flow: require("../assets/flow.png"),
  mobx: require("../assets/mobx.png"),
  devtools: require("../assets/devtools.gif"),
  actionStateView: require("../assets/action-state-view.png"),
  magicMeme: require("../assets/magic_meme.gif")
};

preloader(images);

const theme = createTheme({
  primary: "white",
  secondary: "white"
}, {
  primary: "PT Sans",
  secondary: "Helvetica"
});

theme.screen.components.heading.h1.fontSize = "5rem";

export default class Presentation extends React.Component {
  render() {
    return (
      <Deck transition={["fade"]} transitionDuration={100} theme={theme}>
        <Slide>
          <Image src={images.mobx.replace("/", "")} margin="0px auto 20px" height="200"/>
            <Heading fit caps lineHeight={1} textColor="black">
              MobX
            </Heading>
            <Heading fit caps textColor="black">
              как альтернатива Redux
            </Heading>
          <Text>
              @JiLiZART - Николай Костюрин - Medialooks
          </Text>
        </Slide>

        <Slide textColor="black">
            <Text>MobX — это библиотека, которая делает управление состоянием простым и масштабируемым.</Text>
            <Text>Путем прозрачного применения функционального реактивного программирования (TFRP). </Text>
            <Text>Философия подхода очень простая:</Text>
            <List>
              <ListItem textColor="black">Все, что может быть вычислено из состояния приложения, должно быть вычислено</ListItem>
              <ListItem textColor="black">автоматически</ListItem>
              <ListItem textColor="black">включая UI</ListItem>
              <ListItem textColor="black">сериализацию данных</ListItem>
              <ListItem textColor="black">работу с сервером, и тд</ListItem>
            </List>
        </Slide>

        <Slide maxWidth="100%">
          <Fit>
            <Image src={images.flow.replace("/", "")} margin="0px auto 40px" width="100%"/>
          </Fit>
        </Slide>

        <Slide>
          <Fit>
            <Heading textColor="black">
              Состояние (State)
            </Heading>
            <Text textColor="black">
              Состояние — это данные, которые заставляют работать приложение. <br />
              Обычно оно специфичное, например, список todo или выбранный элемент. <br />
              Состояние похоже на ячейки электронных таблиц Экселя, которые содержат значение.
            </Text>
          </Fit>
        </Slide>

        <Slide>
          <Heading textColor="black">
            Вычисления данных (Derivations)
          </Heading>
          <Text textColor="black">
            Все, что может быть вычислено из состояния без какого-либо дальнейшего взаимодействия, 
            является деривацией.
          </Text>
          <Text textColor="black">
            Вычисления существуют в нескольких формах:
          </Text>

          <List>
            <ListItem textColor="black">Пользовательский интерфейс (UI)</ListItem>
            <ListItem textColor="black">Вычисления, например, сколько todo осталось.</ListItem>
            <ListItem textColor="black">Интеграция с бэкендом, отправка данных на сервер.</ListItem>
          </List>
        </Slide>
        <Slide>
          <Text textColor="black">
            MobX выделяет два вида дериваций:
          </Text>

          <List>
            <ListItem textColor="black">
              Вычисляемые (Computed) значения.
              Могут быть всегда вычисленны из текущего состояния приложения используя чистые функции.
              </ListItem>
            <ListItem textColor="black">Реакции (Reactions). Это сайдэффекты (асинхронная работа с сервером), которые должны происходить автоматически, когда состояние меняется.</ListItem>
          </List>
        </Slide>

        <Slide>
          <Heading textColor="black">
            Действия (Actions)
          </Heading>
          <Text textColor="black">
            Действие — это кусок кода, который изменяет состояние. <br />
            События от пользователя, пуши с сервера, запланированные события и т.д. <br />
            Действие — это как пользователь, который вводит значение в ячейку таблицы.
          </Text>

          <Text textColor="black">
            В MobX действия можно определять явно, чтобы структура кода была чище. <br />
            Так же, если используется строгий режим, MobX позаботится, 
            чтобы состояние невозможно было поменять вне действий.
          </Text>
        </Slide>

        <Slide>
          <Text textColor="black" size={3}>
            MobX поддерживает однонаправленный поток данных, 
            в котором действия изменяют состояние, которое, в свою очередь, обновляет все затронутые представления.
          </Text>

          <Image src={images.actionStateView.replace("/", "")} margin="0px auto 20px" width="100%"/>
        </Slide>

        <Slide>
          <Text textColor="black">
            Все деривации обновляются автоматически и атомарно, когда меняется состояние.
            Как результат не существует промежуточных состояний.
          </Text>

          <Text textColor="black">
            Все деривации обновляются синхронно. Это означает, что после какого-либо действия, 
            можно безопасно читать computed значения и т.д.
          </Text>

          <Text textColor="black">
            Computed значения обновляются лениво. 
            Значение поля не вычисляется до тех пор, пока оно не понадобится какому-либо сайдэффекту (I/O).
          </Text>

          <Text textColor="black">
            Все computed значения должны быть чистыми. Внутри них нельзя менять состояние.
          </Text>
        </Slide>

        <Slide>
          <Heading textColor="black">
            Иллюстрация
          </Heading>
          <Text textColor="black">
            Следующий листинг кода продемонстрирует основные принципы.
          </Text>
        </Slide>

        <CodeSlide
            transition={[]}
            lang="jsx"
            code={require("raw-loader!../assets/mobx.example")}
            ranges={[
              { loc: [0, 57], title: "Пример" },
              { loc: [0, 5] },
              { loc: [7, 8] },
              { loc: [8, 9] },
              { loc: [10, 20] },
              { loc: [21, 26] },
              { loc: [27, 32] },
              { loc: [33, 40] },
              { loc: [42, 43], note: `<none>` },
              { loc: [44, 45], note: `Next: "hello MobX". Progress: 0/1` },
              { loc: [46, 47], note: `Next: "hello MobX". Progress: 0/2` },
              { loc: [48, 49], note: `Next: "hello MobX". Progress: 1/2` },
              { loc: [50, 51] },
              { loc: [52, 53], note: `Next: "MobX forever". Progress: 1/2` }
              // ...
            ]}
          />

          <Slide>
            <Heading textColor="black">
              React
            </Heading>
            <Text textColor="black">
              Время построить реактивный UI вокруг все того же store. <br />
              Как ни странно, не смотря на название, компоненты в React не являются реактивными. <br />
              Эту проблему нам поможет исправить <Code>@observer</Code> декоратор из пакета <Code>mobx-react</Code> <br />
              Он оборачивает метод <Code>render</Code> компонента в функцию <Code>autorun</Code>
              и автоматически синхронизирует компонент с состоянием приложения.
            </Text>
          </Slide>

          <Slide>
            <Text textColor="black">
              Следующий листинг создает несколько React компонентов. <br />
              От MobX используется только декоратор <Code>@observer</Code> <br />
              Этого достаточно, чтобы каждый компонент ререндерился, только когда нужные для него данные изменятся. <br />
              Больше не нужно вызывать <Code>setState</Code>, использовать селекторы, маппить стейт.
            </Text>
          </Slide>

          <CodeSlide
            transition={[]}
            lang="jsx"
            code={require("raw-loader!../assets/react.example")}
            ranges={[
              { loc: [0, 68], title: "Пример" },
              { loc: [4, 5] },
              { loc: [7, 30] },
              { loc: [32, 34] },
              { loc: [40, 57] },
              { loc: [72, 76] }
            ]}
          />

          <CodeSlide
            transition={[]}
            lang="jsx"
            code={require("raw-loader!../assets/react-store.example")}
            ranges={[
              { loc: [0, 5] }
            ]}
          />

          <Slide>
            <Text fit textColor="black"><MountTodoView /></Text>
          </Slide>

          <Slide>
            <Image src={images.magicMeme.replace("/", "")} margin="0px auto 20px" width="100%"/>
          </Slide>

          <Slide>
            <Heading textColor="black">
              Работа со ссылками
            </Heading>
            <Text textColor="black">
              Как же MobX работает со ссылками? Можно ли организовать древовидную структуру? <br />
              В предыдущих примерах кода вы наверное заметили свойство <Code>assignee</Code>? <br />
              Давайте создадим еще один стор с пользователями и присвоим его к таскам в todo.
            </Text>
          </Slide>

          <CodeSlide
            transition={[]}
            lang="jsx"
            code={require("raw-loader!../assets/references.example")}
            ranges={[
              { loc: [0, 7] }
            ]}
          />

          <Slide>
            <Text>
              Теперь у нас есть два независимых стора. <br />
              Один с пользователями, другой с todo. <br />
              Мы просто присвоили <Code>assignee</Code> значения из другого стора. <br />
              Эти изменения автоматически подхватятся в <Code>TodoView</Code> <br />
              Все работает как обычные ссылки в JavaScript. <br />

              С MobX не нужно нормализовывать данные, храните их так как удобно.

              MobX будет отслеживать их автоматически, если они нужны для деривации.
            </Text>
          </Slide>

          <Slide>
            <Heading textColor="black">
              Асинхронные действия
            </Heading>
            <Text textColor="black">
              С того момента, как все в нашем приложении выводится из состояния,
              не имеет значения, когда это состояние меняется.
              Это позволяет создавать асинхронные действия очень просто.
            </Text>
            <Text textColor="black">
              Код реализации очень простой. <br />
              Мы обновляем значение свойства <Code>pendingRequests</Code>, чтобы показать что мы загружаем данные.
              Когда данные загружены, мы обновляем список todo и уменьшаем счетчик <Code>pendingRequests</Code>.
            </Text>
          </Slide>

          <CodeSlide
            transition={[]}
            lang="jsx"
            code={require("raw-loader!../assets/async-actions.example")}
            ranges={[
              { loc: [0, 7] }
            ]}
          />

          <Slide>
            <Text fit textColor="black"><MountTodoAsyncView /></Text>
          </Slide>

          <Slide>
            <Heading textColor="black">
              Devtools
            </Heading>
            <Text textColor="black">
              Пакет <Code>mobx-react-devtools</Code> предоставляет инструменты, которые выводятся в правом верхнем углу. <br />
              Первая кнопка подсвечивает каждый компонент, декорированный <Code>@observer</Code>, который будет сейчас перерисован, <br />
              вторая кнопка показывает, по клику на компонент, дерево зависимостей, от каких данных он зависит.
            </Text>
          </Slide>

          <Slide>
            <Image src={images.devtools.replace("/", "")} margin="0px auto 20px" width="100%"/>
          </Slide>

          <Slide>
            <Heading textColor="black">
              Итого
            </Heading>

            <Text textColor="black">
              Ну, вот и все! Никакого лишнего кода. <br /> 
              Простые декларативные компоненты, которые формируют наш UI, <br />
              которые выводят информацию реактивно из состояния нашего приложения.
            </Text>
            <Text>Краткий список того, что мы сегодня узнали:</Text>
          </Slide>

          <Slide>
            <List>
              <ListItem textColor="black"><Code>@observable</Code> декоратор используется, чтобы MobX мог следить за данными.</ListItem>
              <ListItem textColor="black"><Code>@computed</Code> используется только для вычисления значения из состояния.</ListItem>
              <ListItem textColor="black"><Code>autorun</Code> используется, чтобы автоматически вызывать функции, когда данные поменялись(Логгирование, запросы на сервер и т.д).</ListItem>
              <ListItem textColor="black"><Code>@observer</Code> используется, чтобы сделать React компоненты реактивными. Они будут обновляться автоматически и делать это эффективно. Даже в сложных проектах с большим объемом данных.</ListItem>
            </List>
          </Slide>

          <Slide>
            <Heading textColor="black">Ссылочки</Heading>

            <Text textColor="black">
              <Link target="_blank" href="https://mobx.js.org">mobx.js.org</Link>
            </Text>

            <Heading size={2} textColor="black">React</Heading>

            <Text textColor="black">
              <Link target="_blank" href="https://github.com/KrateLabs/KrateLabs-App">github.com/KrateLabs/KrateLabs-App</Link>
              <br />
              <Link target="_blank" href="https://github.com/gothinkster/react-mobx-realworld-example-app">github.com/gothinkster/react-mobx-realworld-example-app</Link>
              <br />
              <Link target="_blank" href="https://github.com/mweststrate/mobx-todomvc">github.com/mweststrate/mobx-todomvc</Link>
            </Text>

            <Heading size={2} textColor="black">React-Native</Heading>
            <Text>
              <Link target="_blank" href="https://github.com/wojteg1337/MobXApp">github.com/wojteg1337/MobXApp</Link>
              <br />
              <Link target="_blank" href="https://github.com/aksonov/react-native-mobx">github.com/aksonov/react-native-mobx</Link>
              <br />
              <Link target="_blank" href="https://github.com/dabit3/react-native-mobx-list-app">github.com/dabit3/react-native-mobx-list-app</Link>
            </Text>
          </Slide>

          <Slide>
            <Heading textColor="black">
              Николай Костюрин
            </Heading>

            <Text textColor="black">
              <Link target="_blank" href="https://github.com/jilizart">github.com/JiLiZART</Link>
              <br />
              <Link target="_blank" href="https://fb.me/jilizart">fb.me/JiLiZART</Link>
              <br />
              <Link target="_blank" href="https://t.me/jilizart">t.me/JiLiZART</Link>
              <br />
              <Link target="_blank" href="https://twitter.com/jilizart">@JiLiZART</Link>
            </Text>
          </Slide>

          <Slide>
            <Heading textColor="black">
              Вопросы
            </Heading>
            <Text>
              <Link target="_blank" href="http://mobx-gdg.surge.sh">mobx-gdg.surge.sh</Link>
              <Link target="_blank" href="https://github.com/JiLiZART/mobx-gdg-slides">github.com/JiLiZART/mobx-gdg-slides</Link>
            </Text>
          </Slide>
      </Deck>
    );
  }
}
