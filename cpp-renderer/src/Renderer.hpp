/**
 * Copyright (C) by chevp
 */
#pragma once

class Renderer
{
public:
    Renderer();
    ~Renderer();

    void initialize();
    void update(float deltaTime);
    void setParameter(int param);
    void cleanup();
};