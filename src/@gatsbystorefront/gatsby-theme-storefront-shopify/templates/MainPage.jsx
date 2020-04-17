
  return (
    <Flex flexWrap="wrap" px={2} pt={8} mx="auto" style={{ maxWidth: 2160 }}>
      {mainPage.map((block, index) => {
        if (block.type === 'carousel') {
          return (
            <Box width={1} p={1} key={index}>
              <MainPageCarousel carousel={block} data={data} />
            </Box>
          );
        } else if (block.type === 'header') {
          return '';
        } else if (
          block.type === 'collection' &&
          data.collections.nodes.filter(
            collection => collection.handle === block.handle
          )[0]
        ) {
          return (
            <Box width={[1, 1 / 2]} p={1} key={index}>
              <MainPageCollectionBlock
                collection={
                  data.collections.nodes.filter(
                    collection => collection.handle === block.handle
                  )[0]
                }
                textColor={block.textColor}
                textBgColor={block.textBgColor}
              />
            </Box>
          );
        } else if (
          block.type === 'product' &&
          data.products.nodes.filter(
            product => product.handle === block.handle
          )[0]
        ) {
          return (
            <Box width={[1, 1 / 2]} p={1} key={index}>
              <MainPageProductBlock
                product={
                  data.products.nodes.filter(
                    product => product.handle === block.handle
                  )[0]
                }
                textColor={block.textColor}
                textBgColor={block.textBgColor}
              />
            </Box>
          );
        } else {
          return '';
        }
      })}
    </Flex>
  );
};

export default MainPage;
