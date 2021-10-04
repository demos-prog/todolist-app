import { nanoid } from "nanoid";
import { Button } from "@material-ui/core";

export default function HashTagList({ arrOfTags, todoList, setTodoList }) {
  function handleDeleteHasTag(hashTag) {
    setTodoList(
      todoList.map((item) => {
        if (item.hashtag === hashTag) {
          item.hashtag = "";
          return item;
        } else {
          return item;
        }
      })
    );
  }

  return (
    <table style={{ marginTop: 30, marginBottom: 30 }}>
      <thead>
        <tr>
          <th colSpan="2">List of hashtags:</th>
        </tr>
      </thead>
      <tbody>
        {arrOfTags.length > 1 ? (
          arrOfTags.map((hashTag) => {
            return hashTag === "" ? null : (
              <tr key={nanoid()}>
                <td>{hashTag}</td>
                <td>
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => handleDeleteHasTag(hashTag)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            );
          })
        ) : (
          <tr>
            <td>Empty</td>
          </tr>
        )}
      </tbody>
    </table>
  );
}
