const test_json_prettify_1 = () => {
    const json = {
        a: 'a',
        b: 3,
        c: true,
        d: {
            a: 'a',
            b: 4,
            c: true
        },
        e: [
            {
                a: 'a',
                b: '5',
                c: true
            },
            {
                a: 'a',
                b: [
                    {
                        a: 'b'
                    }
                ]
            }
        ]
    }
    const prettyJSON = prettifyJSON(json);
    const expected = "{\n" +
        "\t\"a\": \"a\",\n" +
        "\t\"b\": 3,\n" +
        "\t\"c\": true,\n" +
        "\t\"d\": {\n" +
        "\t\t\"a\": \"a\",\n" +
        "\t\t\"b\": 4,\n" +
        "\t\t\"c\": true,\n" +
        "\t}\n" +
        "}";
    assertEqual(prettyJSON, expected, 'Prettify json initial test');
}


test_json_prettify_1();