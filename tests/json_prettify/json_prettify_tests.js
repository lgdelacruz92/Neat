const test_json_prettify_1 = () => {
    const json = {
        a: 'a',
        b: 3
    }
    const prettyJSON = prettifyJSON(json);
    const expected = "{\n" +
        "\t\"a\": \"a\",\n" +
        "\t\"b\": \"3\",\n" +
        "}";
    assertEqual(prettyJSON, expected, 'Prettify json initial test');
}

test_json_prettify_1();